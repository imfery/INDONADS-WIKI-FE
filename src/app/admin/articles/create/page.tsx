'use client';

import { useRouter } from 'next/navigation';
import React, { useRef, useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Image from 'next/image';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import AdminLayout from '@/app/layouts/AdminLayouts';
import { createArticles, uploadImage } from '@/app/utils/api';
import { useToast } from '@/providers/ToastProvider';

import { Loader2 } from 'lucide-react';
import { ARTICLES_CATEGORIES } from '@/constant/enum';

const ArticlesDashboardForm: React.FC = () => {
    const methods = useForm({
        defaultValues: {
            title: '',
            summary: '',
            category: '',
        },
    });

    const router = useRouter();
    const editorInstanceRef = useRef<any>(null);
    const { success, error } = useToast();
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const [EditorComponent, setEditorComponent] =
        useState<React.ComponentType<any> | null>(null);
    const [isEditorLoaded, setIsEditorLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedBannerUrl, setUploadedBannerUrl] = useState<string | null>(
        null
    );
    const [bannerError, setBannerError] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        import('@/app/components/admin/editor/Editor')
            .then((EditorModule) => {
                setEditorComponent(() => EditorModule.default);
                setIsEditorLoaded(true);
            })
            .catch((error) =>
                console.error('Failed to load the editor component:', error)
            );
    }, []);

    const handleBannerUpload = (file: File | null) => {
        if (!file) {
            return;
        }

        const image = new (window as any).Image() as HTMLImageElement;
        const objectUrl = URL.createObjectURL(file);

        image.onload = async () => {
            console.log(`Image dimensions: ${image.width}x${image.height}`);
            if (image.width >= 1600 && image.height >= 836) {
                setBannerError(null);
                try {
                    const response = await uploadImage(file);
                    setUploadedBannerUrl(response.file.url);
                } catch (error: any) {
                    console.error('Error uploading banner:', error.message);
                    setBannerError('Failed to upload the banner image.');
                }
            } else {
                setBannerError(
                    'Banner image must be at least 1600x836 pixels.'
                );
                setUploadedBannerUrl(null);
            }

            URL.revokeObjectURL(objectUrl);
        };

        image.onerror = () => {
            setBannerError(
                'Invalid image file. Please select a different file.'
            );
            URL.revokeObjectURL(objectUrl);
        };

        image.src = objectUrl;
    };

    const onSubmit = async (data: any) => {
        setShowAlert(false);
        setErrorMessage(undefined);
        setIsLoading(true);

        try {
            const editorContent =
                await editorInstanceRef.current?.saveContent();
            if (editorContent) {
                const requestBody = {
                    ...data,
                    content: JSON.stringify(editorContent),
                    banner: uploadedBannerUrl || '',
                };

                await createArticles(requestBody);
                success('Articles created successfully', 3000);
                router.push('/admin/articles');
            } else {
                throw new Error('Failed to save editor content.');
            }
        } catch (err: any) {
            if (err.response && err.response.status === 400) {
                setErrorMessage(
                    err.response.data.message || 'Invalid input data'
                );
            } else {
                error(err.message, 3000);
                setErrorMessage(err.message);
            }
            setShowAlert(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveButtonClick = () => {
        methods.handleSubmit(onSubmit)();
    };

    return (
        <AdminLayout>
            <div className='relative overflow-x-auto'>
                <div className='pb-8 bg-white dark:bg-[#121212]'>
                    <div className='p-5'>
                        <h2 className='text-3xl font-semibold text-gray-900 dark:text-white'>
                            Articles
                        </h2>
                        <p className='mt-1 text-sm font-normal text-gray-500 dark:text-gray-300'>
                            Create an article from scratch here!
                        </p>

                        {showAlert && (
                            <Alert variant='destructive' className='mb-4'>
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    {errorMessage}
                                </AlertDescription>
                            </Alert>
                        )}

                        {bannerError && (
                            <Alert variant='destructive' className='mb-4'>
                                <AlertTitle>Banner Error</AlertTitle>
                                <AlertDescription>
                                    {bannerError}
                                </AlertDescription>
                            </Alert>
                        )}

                        <FormProvider {...methods}>
                            <form className='space-y-6 w-3/4 mt-10'>
                                <FormField
                                    name='title'
                                    control={methods.control}
                                    rules={{ required: 'Title is required' }}
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel className='dark:text-gray-300'>
                                                Title
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className={
                                                        fieldState.invalid
                                                            ? 'border-red-500 dark:border-red-500'
                                                            : 'dark:bg-gray-700 dark:text-white dark:border-gray-600'
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name='summary'
                                    control={methods.control}
                                    rules={{ required: 'Summary is required' }}
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel className='dark:text-gray-300'>
                                                Summary
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    {...field}
                                                    className={
                                                        fieldState.invalid
                                                            ? 'border-red-500 dark:border-red-500'
                                                            : 'dark:bg-gray-700 dark:text-white dark:border-gray-600'
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name='category'
                                    control={methods.control}
                                    rules={{ required: 'Category is required' }}
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel className='dark:text-gray-300'>
                                                Category
                                            </FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value || ''}
                                                >
                                                    <SelectTrigger
                                                        className={
                                                            fieldState.invalid
                                                                ? 'border-red-500 dark:border-red-500'
                                                                : 'dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                                                        }
                                                    >
                                                        <SelectValue placeholder='Select a category' />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.values(
                                                            ARTICLES_CATEGORIES
                                                        ).map((category) => (
                                                            <SelectItem
                                                                key={category}
                                                                value={category}
                                                            >
                                                                {category}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormItem>
                                    <FormLabel className='dark:text-gray-300'>
                                        Banner Image (1620x1080 or larger)
                                    </FormLabel>
                                    <Input
                                        type='file'
                                        onChange={(e) => {
                                            if (e.target.files?.[0]) {
                                                handleBannerUpload(
                                                    e.target.files[0]
                                                );
                                            }
                                        }}
                                        className='mt-2 dark:bg-gray-700 dark:text-white dark:border-gray-600'
                                    />
                                    {uploadedBannerUrl && (
                                        <Dialog
                                            open={isDialogOpen}
                                            onOpenChange={setIsDialogOpen}
                                        >
                                            <DialogTrigger asChild>
                                                <Button
                                                    type='button'
                                                    className='mt-2 bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'
                                                >
                                                    Preview Image
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className='p-4 '>
                                                <DialogTitle></DialogTitle>
                                                <DialogDescription></DialogDescription>
                                                <Image
                                                    src={uploadedBannerUrl}
                                                    alt='Preview Banner'
                                                    width={800}
                                                    height={450}
                                                    className='w-full h-auto'
                                                />
                                            </DialogContent>
                                        </Dialog>
                                    )}
                                </FormItem>
                            </form>
                        </FormProvider>

                        {EditorComponent && (
                            <EditorComponent ref={editorInstanceRef} />
                        )}

                        <Button
                            className='mt-4 bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:text-white'
                            onClick={handleSaveButtonClick}
                            disabled={!isEditorLoaded || isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className='animate-spin' />
                            ) : (
                                'Save Articles'
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ArticlesDashboardForm;
