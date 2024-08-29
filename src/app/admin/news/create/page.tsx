'use client';

import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

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

const NewsDashboardForm: React.FC = () => {
    const methods = useForm({
        defaultValues: {
            title: '', // Initialize with an empty string
            summary: '', // Initialize with an empty string
            category: '', // Initialize with an empty string
        },
    });
    const router = useRouter();
    const editorInstanceRef = useRef<any>(null);

    const onSubmit = async (data: any) => {
        // Save the editor content before form submission
        const editorContent = await editorInstanceRef.current?.saveContent();

        if (editorContent) {
            const requestBody = {
                ...data,
                content: editorContent.blocks,
            };

            console.log('Request Body:', requestBody);

            // Perform the API request or any other form submission logic here
        } else {
            console.error('Failed to save editor content.');
        }
    };

    const handleSaveButtonClick = () => {
        // Manually trigger the form submission handler
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
                                                    value={field.value || ''} // Ensure value is not undefined
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
                                                    value={field.value || ''} // Ensure value is not undefined
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
                                                    value={field.value || ''} // Ensure value is not undefined
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
