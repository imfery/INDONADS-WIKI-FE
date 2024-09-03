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
    const [isEditorLoaded, setIsEditorLoaded] = useState(false); // Track if Editor has loaded

    useEffect(() => {
        // Dynamically import the Editor component and handle it with `.then`
        import('@/app/components/admin/editor/Editor')
            .then((EditorModule) => {
                setEditorComponent(() => EditorModule.default);
                setIsEditorLoaded(true); // Set as loaded once component is imported
            })
            .catch((error) =>
                console.error('Failed to load the editor component:', error)
            );
    }, []);

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
                    await createArticles(requestBody); // Call the API function to create articles
                    success('Articles created successfully', 3000); // Show success toast message
                    router.push('/admin/articles'); // Redirect to the articles list page after successful creation
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
                            Articles
                        </h2>
                        <p className='mt-1 text-sm font-normal text-gray-500'>
                            Create a articles article from scratch here!
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
                                                    placeholder='Enter articles title'
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
                                                    placeholder='Enter articles summary'
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
                                                        <SelectItem value='Articles'>
                                                            Articles
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

                        {/* Editor Component Dynamically Loaded */}
                        {EditorComponent && (
                            <EditorComponent ref={editorInstanceRef} />
                        )}

                        {/* Save Button for Form Submission */}
                        <Button
                            className='mt-4'
                            onClick={handleSaveButtonClick}
                            disabled={!isEditorLoaded} // Disable button until editor is ready
                        >
                            Save Articles
                        </Button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ArticlesDashboardForm;
