'use client';

import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormControl,
} from '@/components/ui/form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import AdminLayout from '@/app/layouts/AdminLayouts';
import { getSpaceById, updateSpace } from '@/app/utils/api';
import { useToast } from '@/providers/ToastProvider';

interface SpaceFormValues {
    category: string;
    title: string;
    url: string;
}

const SpaceEditForm: React.FC = () => {
    const methods = useForm<SpaceFormValues>({
        defaultValues: {
            category: '',
            title: '',
            url: '',
        },
    });

    const router = useRouter();
    const { success } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [items, setItems] = useState<
        { _id: string; title: string; url: string }[]
    >([]);
    const [id, setId] = useState<string | null>(null);
    const [isAddingNewSpace, setIsAddingNewSpace] = useState(false);

    useEffect(() => {
        const fetchSpace = async () => {
            const params = new URLSearchParams(window.location.search);
            const spaceId = params.get('id');

            if (spaceId) {
                setId(spaceId);
                const response = await getSpaceById(spaceId);

                if (response && response.data) {
                    methods.setValue('category', response.data.category);
                    setItems(response.data.items || []);
                }
            }
        };

        fetchSpace();
    }, [methods]);

    const onSubmit = async (data: SpaceFormValues) => {
        setShowAlert(false);
        setIsLoading(true);

        try {
            if (!data.category || items.length === 0) {
                setShowAlert(true);
                setIsLoading(false);
                return;
            }

            const sanitizedItems = items.map(({ title, url }) => ({
                title,
                url,
            }));

            const spaceData = {
                category: data.category,
                items: sanitizedItems,
            };

            if (id) {
                success('Space updated successfully', 3000);
                await updateSpace(id, spaceData);
                router.push('/admin/spaces');
            }
        } catch (error) {
            setShowAlert(true);
            console.error('Failed to update space entry', error);
        } finally {
            setIsLoading(false);
        }
    };

    const onError = () => {
        setShowAlert(true);
    };

    const addItem = () => {
        const { title, url } = methods.getValues();
        if (title && url) {
            setItems((prevItems) => [
                ...prevItems,
                { _id: Date.now().toString(), title, url },
            ]);
            methods.setValue('title', '');
            methods.setValue('url', '');
            setIsAddingNewSpace(false);
        }
    };

    const removeItem = (index: number) => {
        setItems((prevItems) => prevItems.filter((_, i) => i !== index));
    };

    return (
        <AdminLayout>
            <div className='relative overflow-x-auto'>
                <div className='pb-8 bg-white dark:bg-[#121212]'>
                    <div className='p-5'>
                        <h2 className='text-3xl font-semibold text-gray-900 dark:text-white'>
                            Edit Space
                        </h2>
                        <p className='mt-1 text-sm font-normal text-gray-500 dark:text-gray-300'>
                            Edit the space entry.
                        </p>

                        {showAlert && (
                            <Alert variant='destructive' className='mb-4'>
                                <AlertTitle>Submission Error</AlertTitle>
                                <AlertDescription>
                                    Please ensure all required fields are
                                    filled, and at least one item is added.
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
                                    name='category'
                                    control={methods.control}
                                    rules={{ required: 'Category is required' }}
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel className='dark:text-gray-300'>
                                                Category
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

                                <Button
                                    type='button'
                                    onClick={() =>
                                        setIsAddingNewSpace(!isAddingNewSpace)
                                    }
                                    className='bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500'
                                >
                                    {isAddingNewSpace
                                        ? 'Collapse'
                                        : 'Add New Spaces'}
                                </Button>

                                {isAddingNewSpace && (
                                    <div className='mt-4 space-y-4'>
                                        <FormField
                                            name='title'
                                            control={methods.control}
                                            rules={{
                                                required: 'Title is required',
                                            }}
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
                                            name='url'
                                            control={methods.control}
                                            rules={{
                                                required: 'URL is required',
                                            }}
                                            render={({ field, fieldState }) => (
                                                <FormItem>
                                                    <FormLabel className='dark:text-gray-300'>
                                                        URL
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

                                        <Button
                                            type='button'
                                            onClick={addItem}
                                            className='bg-green-500 text-white hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-500'
                                        >
                                            Add Entry
                                        </Button>
                                    </div>
                                )}

                                <div className='flex flex-wrap mt-4 space-x-2 space-y-2'>
                                    {items.map((item, index) => (
                                        <Badge
                                            key={item._id}
                                            variant='secondary'
                                            className='flex items-center space-x-2 px-3 py-2'
                                        >
                                            <span>{`Title: ${item.title}, URL: ${item.url}`}</span>
                                            <button
                                                onClick={() =>
                                                    removeItem(index)
                                                }
                                                className='ml-2 text-red-600 dark:text-red-500'
                                            >
                                                X
                                            </button>
                                        </Badge>
                                    ))}
                                </div>

                                <Button
                                    type='submit'
                                    className='mt-4 bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Updating...' : 'Update Space'}
                                </Button>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default SpaceEditForm;
