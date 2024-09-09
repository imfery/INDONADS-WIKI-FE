'use client';

import { format, isValid, parse, setHours, setMinutes } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

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
import { getEventById, updateEvent } from '@/app/utils/api';
import { useToast } from '@/providers/ToastProvider';
import SearchParamsLoader from '@/app/components/admin/SearchParamsLoader';

import { Loader2 } from 'lucide-react';
import { EVENTS_CATEGORIES } from '@/constant/enum';

const EditEventForm: React.FC = () => {
    const methods = useForm();
    const router = useRouter();
    const { success, error: errorToast } = useToast();
    const [params, setParams] = useState<URLSearchParams | null>(null);
    const eventId = params?.get('id');
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [selectedTime, setSelectedTime] = useState<string | undefined>();
    const [showAlert, setShowAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>();

    useEffect(() => {
        async function fetchEvent() {
            try {
                if (eventId) {
                    const event = await getEventById(eventId);

                    const eventDate = parse(
                        event.date,
                        'dd MMM yyyy HH:mm',
                        new Date()
                    );

                    if (!isValid(eventDate)) {
                        throw new Error('Invalid date format');
                    }

                    const formattedTime = `${eventDate
                        .getHours()
                        .toString()
                        .padStart(2, '0')}:${eventDate
                        .getMinutes()
                        .toString()
                        .padStart(2, '0')}`;

                    setSelectedDate(eventDate);
                    setSelectedTime(formattedTime);

                    methods.reset({
                        title: event.title,
                        description: event.description,
                        location: event.location,
                        category: event.category,
                        date: eventDate.toISOString(),
                        time: formattedTime,
                    });
                }
            } catch (error) {
                setErrorMessage('Failed to load event details.');
                setShowAlert(true);
            }
        }

        if (eventId) {
            fetchEvent();
        }
    }, [eventId, methods]);

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

            await updateEvent(eventId as string, requestBody);
            success('Event has been successfully edited', 3000);
            router.push('/admin/events');
        } catch (error: any) {
            errorToast('Event failed to be edited', 3000);
            setErrorMessage(error.message);
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
            const combinedDate = setHours(
                setMinutes(new Date(date), +minutes),
                +hours
            );
            return combinedDate.toISOString();
        }
        return undefined;
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
                            Edit Event
                        </h2>
                        <p className='mt-1 text-sm font-normal text-gray-500'>
                            Edit the event by updating the form below.
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
                                    rules={{
                                        required: 'Title is required',
                                    }}
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Enter event title'
                                                    {...field}
                                                    className={cn(
                                                        fieldState.invalid
                                                            ? 'border-red-500'
                                                            : ''
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
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder='Enter event description'
                                                    {...field}
                                                    className={cn(
                                                        fieldState.invalid
                                                            ? 'border-red-500'
                                                            : ''
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
                                        rules={{
                                            required: 'Date is required',
                                        }}
                                        render={({ field, fieldState }) => (
                                            <FormItem className='flex-1'>
                                                <FormLabel>Date</FormLabel>
                                                <FormControl>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant='outline'
                                                                className={cn(
                                                                    'w-full justify-start text-left font-normal',
                                                                    !selectedDate &&
                                                                        'text-muted-foreground',
                                                                    fieldState.invalid
                                                                        ? 'border-red-500'
                                                                        : ''
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
                                        rules={{
                                            required: 'Time is required',
                                        }}
                                        render={({ field, fieldState }) => (
                                            <FormItem className='flex-1'>
                                                <FormLabel>Time</FormLabel>
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
                                                                : ''
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
                                    rules={{
                                        required: 'Location is required',
                                    }}
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel>Location</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Enter event location'
                                                    {...field}
                                                    className={cn(
                                                        fieldState.invalid
                                                            ? 'border-red-500'
                                                            : ''
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
                                    rules={{
                                        required: 'Category is required',
                                    }}
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={(value) =>
                                                        field.onChange(value)
                                                    }
                                                    value={field.value || ''}
                                                >
                                                    <SelectTrigger
                                                        className={cn(
                                                            'w-[180px]',
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
                                    className='mt-4'
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <Loader2 className='animate-spin' />
                                    ) : (
                                        'Update Event'
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

export default EditEventForm;
