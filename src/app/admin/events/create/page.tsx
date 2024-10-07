'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { TimePicker } from '@/components/ui/timepicker';

import AdminLayout from '@/app/layouts/AdminLayouts';
import { createEvent } from '@/app/utils/api';
import { useToast } from '@/providers/ToastProvider';

import { EVENTS_CATEGORIES } from '@/constant/enum';

const EventsCreateForm: React.FC = () => {
    const methods = useForm();
    const router = useRouter();
    const { success } = useToast();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [selectedTime, setSelectedTime] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>();

    useEffect(() => {
        if (methods.formState.isSubmitSuccessful) {
            setShowAlert(false);
        }
    }, [methods.formState.isSubmitSuccessful]);

    const onSubmit = async (data: any) => {
        setShowAlert(false);
        setErrorMessage(undefined);
        setIsLoading(true);

        try {
            const datetime = combineDateAndTime(selectedDate, selectedTime);
            const requestBody = {
                ...data,
            };
            delete requestBody.date;
            delete requestBody.time;
            requestBody.date = datetime;

            await createEvent(requestBody);
            success('Event has been successfully created', 3000);
            router.push('/admin/events');
        } catch (error: any) {
            setErrorMessage(error.message);
            error('Failed to create event.', 3000);
            setShowAlert(true);
        } finally {
            setIsLoading(false);
        }
    };

    const onError = () => {
        setShowAlert(true);
    };

    const combineDateAndTime = (
        date?: Date,
        time?: string
    ): string | undefined => {
        if (date && time) {
            const [hours, minutes] = time.split(':');
            const combinedDate = new Date(date);
            combinedDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
            return combinedDate.toISOString();
        }
        return undefined;
    };

    return (
        <AdminLayout>
            <div className='relative overflow-x-auto'>
                <div className='pb-8 bg-white dark:bg-[#121212]'>
                    <div className='p-5'>
                        <h2 className='text-3xl font-semibold text-gray-900 dark:text-white'>
                            Events
                        </h2>
                        <p className='mt-1 text-sm font-normal text-gray-500 dark:text-gray-300'>
                            Create an event by filling out the form.
                        </p>
                        {showAlert && (
                            <Alert variant='destructive' className='mb-4'>
                                <AlertTitle>Submission Error</AlertTitle>
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
                                                    placeholder='Enter event title'
                                                    {...field}
                                                    className={cn(
                                                        fieldState.invalid
                                                            ? 'border-red-500'
                                                            : 'dark:bg-gray-700 dark:text-white dark:border-gray-600'
                                                    )}
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
                                            <FormLabel className='dark:text-gray-300'>
                                                Description
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder='Enter event description'
                                                    {...field}
                                                    className={cn(
                                                        fieldState.invalid
                                                            ? 'border-red-500'
                                                            : 'dark:bg-gray-700 dark:text-white dark:border-gray-600'
                                                    )}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className='flex space-x-6'>
                                    <FormField
                                        name='date'
                                        control={methods.control}
                                        rules={{ required: 'Date is required' }}
                                        render={({ field, fieldState }) => (
                                            <FormItem className='flex-1'>
                                                <FormLabel className='dark:text-gray-300'>
                                                    Date
                                                </FormLabel>
                                                <FormControl>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant='outline'
                                                                className={cn(
                                                                    'w-full justify-start text-left font-normal dark:text-white',
                                                                    !selectedDate &&
                                                                        'text-muted-foreground dark:text-gray-400',
                                                                    fieldState.invalid
                                                                        ? 'border-red-500'
                                                                        : 'dark:bg-gray-700 dark:border-gray-600'
                                                                )}
                                                            >
                                                                <CalendarIcon className='mr-2 h-4 w-4' />
                                                                {selectedDate ? (
                                                                    format(
                                                                        selectedDate,
                                                                        'PPP'
                                                                    )
                                                                ) : (
                                                                    <span>
                                                                        Pick a
                                                                        date
                                                                    </span>
                                                                )}
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className='w-auto p-0'>
                                                            <Calendar
                                                                mode='single'
                                                                selected={
                                                                    selectedDate
                                                                }
                                                                onSelect={(
                                                                    date
                                                                ) => {
                                                                    setSelectedDate(
                                                                        date
                                                                    );
                                                                    field.onChange(
                                                                        date?.toISOString()
                                                                    );
                                                                }}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        name='time'
                                        control={methods.control}
                                        rules={{ required: 'Time is required' }}
                                        render={({ field, fieldState }) => (
                                            <FormItem className='flex-1'>
                                                <FormLabel className='dark:text-gray-300'>
                                                    Time
                                                </FormLabel>
                                                <FormControl>
                                                    <TimePicker
                                                        value={selectedTime}
                                                        onChange={(time) => {
                                                            setSelectedTime(
                                                                time
                                                            );
                                                            field.onChange(
                                                                time
                                                            );
                                                        }}
                                                        className={cn(
                                                            fieldState.invalid
                                                                ? 'border-red-500'
                                                                : 'dark:bg-gray-700 dark:text-white dark:border-gray-600'
                                                        )}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    name='location'
                                    control={methods.control}
                                    rules={{ required: 'Location is required' }}
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel className='dark:text-gray-300'>
                                                Location
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Enter event location'
                                                    {...field}
                                                    className={cn(
                                                        fieldState.invalid
                                                            ? 'border-red-500'
                                                            : 'dark:bg-gray-700 dark:text-white dark:border-gray-600'
                                                    )}
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
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger
                                                        className={cn(
                                                            'w-[180px] dark:bg-gray-700 dark:border-gray-600 dark:text-white',
                                                            fieldState.invalid
                                                                ? 'border-red-500'
                                                                : ''
                                                        )}
                                                    >
                                                        <SelectValue placeholder='Select a category' />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.values(
                                                            EVENTS_CATEGORIES
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

                                <Button
                                    type='submit'
                                    className='mt-4 bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:text-white'
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <Loader2 className='animate-spin' />
                                    ) : (
                                        'Create Event'
                                    )}
                                </Button>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default EventsCreateForm;
