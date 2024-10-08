'use client';

import { useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
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
import { fetchArticlesById, updateArticles } from '@/app/utils/api';
import { useToast } from '@/providers/ToastProvider';
import SearchParamsLoader from '@/app/components/admin/SearchParamsLoader';
import { ARTICLES_CATEGORIES } from '@/constant/enum';

const EditArticlesForm: React.FC = () => {
    const methods = useForm({
        defaultValues: {
            title: '',
            summary: '',
            category: '',
        },
    });

    const router = useRouter();
    const { success, error } = useToast();
    const [params, setParams] = useState<URLSearchParams | null>(null);
    const articlesId = params?.get('id');
    const editorInstanceRef = useRef<any>(null);
    const [EditorComponent, setEditorComponent] =
        useState<React.ComponentType<any> | null>(null);
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const [initialData, setInitialData] = useState<any>(null);
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

        const fetchArticles = async () => {
            try {
                if (articlesId) {
                    const articles = await fetchArticlesById(articlesId);
                    methods.reset({
                        title: articles.title,
                        summary: articles.summary,
                        category: articles.category,
                    });

                    setInitialData(JSON.parse(articles.content));
                }
            } catch (err) {
                setErrorMessage('Failed to load articles details.');
                setShowAlert(true);
            }
        };

        if (articlesId) {
            fetchArticles();
        }
    }, [articlesId, methods]);

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

                await updateArticles(articlesId as string, requestBody);
                success('Articles has been successfully edited', 3000);
                router.push('/admin/articles');
            } else {
                throw new Error('Failed to save editor content.');
            }
        } catch (err: any) {
            if (err.response && err.response.status === 400) {
                setErrorMessage(
                    err.response.data.message || 'Invalid input data'
                );
                error(err.response.data.message || 'Invalid input data', 3000);
            } else {
                error(err.message, 3000);
                setErrorMessage(err.message);
            }
            setShowAlert(true);
        } finally {
            setIsLoading(false);
        }
    };

    const onError = () => {
        setShowAlert(true);
    };

    return (
        <AdminLayout>
            <Suspense fallback={<div>Loading...</div>}>
                <SearchParamsLoader onLoad={setParams} />
            </Suspense>
            <div className='relative overflow-x-auto'>
                <div className='pb-8 bg-white dark:bg-[#121212]'>
                    <div className='p-5'>
                        <h2 className='text-3xl font-semibold text-gray-900 dark:text-white'>
                            Edit Articles
                        </h2>
                        <p className='mt-1 text-sm font-normal text-gray-500 dark:text-gray-300'>
                            Edit the articles article below.
                        </p>
                        {showAlert && (
                            <Alert variant='destructive' className='mb-4'>
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    {errorMessage ||
                                        'Please fill out all required fields before submitting.'}
                                </AlertDescription>
                            </Alert>
                        )}
                        <FormProvider {...methods}>
                            <form
                                onSubmit={methods.handleSubmit(
                                    onSubmit,
                                    onError
                                )}
                                className='space-y-6 w-3/4 mt-10'
                            >
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

                        {EditorComponent && initialData && (
                            <EditorComponent
                                ref={editorInstanceRef}
                                initialData={initialData}
                            />
                        )}

                        <Button
                            className='mt-4 bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:text-white'
                            onClick={methods.handleSubmit(onSubmit, onError)}
                            disabled={!isEditorLoaded || isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className='animate-spin' />
                            ) : (
                                'Update Articles'
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default EditArticlesForm;
