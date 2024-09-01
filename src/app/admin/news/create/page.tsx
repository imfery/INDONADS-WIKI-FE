'use client';

import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
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
import { createNews } from '@/app/utils/api';
import { useToast } from '@/providers/ToastProvider';

const NewsDashboardForm: React.FC = () => {
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

    const onSubmit = async (data: any) => {
        setShowAlert(false); // Reset alert visibility
        setErrorMessage(undefined); // Reset error message

        try {
            const editorContent =
                await editorInstanceRef.current?.saveContent();

            if (editorContent) {
                const requestBody = {
                    ...data,
                    content: JSON.stringify(editorContent), // Convert editor blocks to JSON string
                };

                try {
                    await createNews(requestBody); // Call the API function to create news
                    success('News created successfully', 3000); // Show success toast message
                    router.push('/admin/news'); // Redirect to the news list page after successful creation
                } catch (err: any) {
                    if (err.response && err.response.status === 400) {
                        // Check if error is a 400 response
                        setErrorMessage(
                            err.response.data.message || 'Invalid input data'
                        );
                    } else {
                        error(err.message, 3000);
                        setErrorMessage(err.message);
                    }
                    setShowAlert(true); // Show the alert with error message
                }
            } else {
                console.error('Failed to save editor content.');
                setErrorMessage('Failed to save editor content.');
                setShowAlert(true); // Show the alert if editor content is not saved
            }
        } catch (error) {
            console.error('Error saving editor content:', error);
            setErrorMessage('An unexpected error occurred.');
            setShowAlert(true); // Show the alert for unexpected errors
        }
    };

    const handleSaveButtonClick = () => {
        methods.handleSubmit(onSubmit)();
    };

    return (
        <AdminLayout>
            <div className='relative overflow-x-auto'>
                <div className='pb-8 bg-white'>
                    <div className='p-5'>
                        <h2 className='text-3xl font-semibold text-gray-900'>
                            News
                        </h2>
                        <p className='mt-1 text-sm font-normal text-gray-500'>
                            Create a news article from scratch here!
                        </p>

                        {/* Show alert if there's an error */}
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
                        <Editor ref={editorInstanceRef} />

                        {/* Save Button for Form Submission */}
                        <Button
                            className='mt-4'
                            onClick={handleSaveButtonClick}
                        >
                            Save News
                        </Button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default NewsDashboardForm;
