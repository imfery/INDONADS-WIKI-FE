'use client';

import { useRouter } from 'next/navigation';
import React, { useRef, useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
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

import AdminLayout from '@/app/layouts/AdminLayouts';
import { createArticles } from '@/app/utils/api';
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
                };

                try {
                    await createArticles(requestBody);
                    success('Articles created successfully', 3000);
                    router.push('/admin/articles');
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
                }
            } else {
                console.error('Failed to save editor content.');
                setErrorMessage('Failed to save editor content.');
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Error saving editor content:', error);
            setErrorMessage('An unexpected error occurred.');
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
                            Create an articles article from scratch here!
                        </p>

                        {showAlert && (
                            <Alert variant='destructive' className='mb-4'>
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    {errorMessage}
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
                                                    placeholder='Enter articles title'
                                                    {...field}
                                                    value={field.value || ''}
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
                                                    placeholder='Enter articles summary'
                                                    {...field}
                                                    value={field.value || ''}
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
