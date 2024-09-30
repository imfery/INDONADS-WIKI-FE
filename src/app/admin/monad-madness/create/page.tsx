'use client';

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormControl,
} from '@/components/ui/form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/providers/ToastProvider';

import AdminLayout from '@/app/layouts/AdminLayouts';
import { createMonadMadness, uploadImage } from '@/app/utils/api';

const MonadMadnessCreateForm: React.FC = () => {
    const methods = useForm();
    const { success } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(
        null
    );
    const [showAlert, setShowAlert] = useState(false);

    const handleImageUpload = async (file: File) => {
        try {
            const response = await uploadImage(file);
            setUploadedImageUrl(response.file.url);
        } catch (error: any) {
            console.error('Error uploading image:', error.message);
        }
    };

    const onSubmit = async (data: any) => {
        setShowAlert(false);
        setIsLoading(true);

        try {
            const requestBody = {
                ...data,
                image: uploadedImageUrl || '',
            };

            await createMonadMadness(requestBody);
            success('Monad Madness created successfully', 3000);
            router.push('/admin/monad-madness');
        } catch (error: any) {
            setShowAlert(true);
            console.error('Failed to create Monad Madness entry', error);
        } finally {
            setIsLoading(false);
        }
    };

    const onError = () => {
        setShowAlert(true);
    };

    return (
        <AdminLayout>
            <div className='relative overflow-x-auto'>
                <div className='pb-8 bg-white'>
                    <div className='p-5'>
                        <h2 className='text-3xl font-semibold text-gray-900'>
                            Create Monad Madness
                        </h2>
                        <p className='mt-1 text-sm font-normal text-gray-500'>
                            Create a new Monad Madness entry.
                        </p>

                        {showAlert && (
                            <Alert variant='destructive' className='mb-4'>
                                <AlertTitle>Submission Error</AlertTitle>
                                <AlertDescription>
                                    Please ensure all required fields are
                                    filled.
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
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
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

                                <FormField
                                    name='description'
                                    control={methods.control}
                                    rules={{
                                        required: 'Description is required',
                                    }}
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    {...field}
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

                                <FormField
                                    name='twitter'
                                    control={methods.control}
                                    rules={{
                                        required: 'Twitter handle is required',
                                    }}
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel>Twitter</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
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

                                <FormField
                                    name='website'
                                    control={methods.control}
                                    rules={{
                                        required: 'Website URL is required',
                                    }}
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel>Website</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
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

                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    {uploadedImageUrl ? (
                                        <div className='mb-4'>
                                            <Image
                                                src={uploadedImageUrl}
                                                alt='Uploaded Image'
                                                width={400}
                                                height={300}
                                                className='w-full h-auto'
                                            />
                                            <div className='mt-2'>
                                                <Button
                                                    type='button'
                                                    variant='outline'
                                                    onClick={() =>
                                                        setUploadedImageUrl(
                                                            null
                                                        )
                                                    }
                                                >
                                                    Replace Image
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <Input
                                            type='file'
                                            onChange={(e) => {
                                                if (e.target.files)
                                                    handleImageUpload(
                                                        e.target.files[0]
                                                    );
                                            }}
                                            className='mt-2'
                                        />
                                    )}
                                </FormItem>

                                <Button
                                    type='submit'
                                    className='mt-4'
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? 'Creating...'
                                        : 'Create Monad Madness'}
                                </Button>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default MonadMadnessCreateForm;
