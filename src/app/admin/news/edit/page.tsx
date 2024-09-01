'use client';

import { useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useRef, useState } from 'react';
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

import Editor from '@/app/components/admin/editor/Editor';
import AdminLayout from '@/app/layouts/AdminLayouts';
import { fetchNewsById, updateNews } from '@/app/utils/api';
import { useToast } from '@/providers/ToastProvider';
import SearchParamsLoader from '@/app/components/admin/SearchParamsLoader';

const EditNewsForm: React.FC = () => {
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
    const newsId = params?.get('id');
    const editorInstanceRef = useRef<any>(null);
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const [initialData, setInitialData] = useState<any>(null); // State for initial editor data

    useEffect(() => {
        const fetchNews = async () => {
            try {
                if (newsId) {
                    const news = await fetchNewsById(newsId);
                    methods.reset({
                        title: news.title,
                        summary: news.summary,
                        category: news.category,
                    });

                    setInitialData(JSON.parse(news.content)); // Set initial data for editor
                }
            } catch (err) {
                console.log('Error -> ', err);
                setErrorMessage('Failed to load news details.');
                setShowAlert(true);
            }
        };

        if (newsId) {
            fetchNews();
        }
    }, [newsId, methods]);

    const onSubmit = async (data: any) => {
        setShowAlert(false);
        setErrorMessage(undefined);

        try {
            const editorContent =
                await editorInstanceRef.current?.saveContent();
            if (editorContent) {
                const requestBody = {
                    ...data,
                    content: JSON.stringify(editorContent), // Convert editor blocks to JSON string
                };

                await updateNews(newsId as string, requestBody);
                success('News has been successfully edited', 3000);
                router.push('/admin/news');
            } else {
                throw new Error('Failed to save editor content.');
            }
        } catch (err: any) {
            if (err.response && err.response.status === 400) {
                // Check if error is a 400 response
                setErrorMessage(
                    err.response.data.message || 'Invalid input data'
                );
                error(err.response.data.message || 'Invalid input data', 3000);
            } else {
                error(err.message, 3000);
                setErrorMessage(err.message);
            }
            setShowAlert(true);
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
                <div className='pb-8 bg-white'>
                    <div className='p-5'>
                        <h2 className='text-3xl font-semibold text-gray-900'>
                            Edit News
                        </h2>
                        <p className='mt-1 text-sm font-normal text-gray-500'>
                            Edit the news article below.
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
                                {/* Title Field */}
                                <FormField
                                    name='title'
                                    control={methods.control}
                                    rules={{ required: 'Title is required' }}
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Enter news title'
                                                    {...field}
                                                    value={field.value || ''}
                                                    className={
                                                        fieldState.invalid
                                                            ? 'border-red-500'
                                                            : ''
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Summary Field */}
                                <FormField
                                    name='summary'
                                    control={methods.control}
                                    rules={{ required: 'Summary is required' }}
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel>Summary</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder='Enter news summary'
                                                    {...field}
                                                    value={field.value || ''}
                                                    className={
                                                        fieldState.invalid
                                                            ? 'border-red-500'
                                                            : ''
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Category Field */}
                                <FormField
                                    name='category'
                                    control={methods.control}
                                    rules={{ required: 'Category is required' }}
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
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
                                                                ? 'border-red-500'
                                                                : ''
                                                        }
                                                    >
                                                        <SelectValue placeholder='Select a category' />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value='News'>
                                                            News
                                                        </SelectItem>
                                                        <SelectItem value='Technology'>
                                                            Technology
                                                        </SelectItem>
                                                        <SelectItem value='Health'>
                                                            Health
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </FormProvider>

                        {/* Editor Component */}
                        {initialData && (
                            <Editor
                                ref={editorInstanceRef}
                                initialData={initialData}
                            />
                        )}

                        {/* Save Button for Form Submission */}
                        <Button
                            className='mt-4'
                            onClick={methods.handleSubmit(onSubmit, onError)}
                        >
                            Update News
                        </Button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default EditNewsForm;
