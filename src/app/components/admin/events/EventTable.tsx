import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { deleteEventById } from '@/app/utils/api';

interface EventTableProps {
    events: Array<{
        id: number;
        title: string;
        date: string;
        createdAt: string;
    }>;
    currentPage: number;
    resultsPerPage: number;
    onDeleteSuccess: () => void;
}

export default function EventTable({
    events,
    currentPage,
    resultsPerPage,
    onDeleteSuccess,
}: EventTableProps) {
    const router = useRouter();
    const [deletingEventId, setDeletingEventId] = useState<number | null>(null);

    const handleEdit = (id: string) => {
        router.push(`/admin/events/edit?id=${id}`);
    };

    const handleDelete = async () => {
        if (deletingEventId !== null) {
            try {
                await deleteEventById(deletingEventId.toString());
                onDeleteSuccess();
                setDeletingEventId(null);
            } catch (error) {
                console.error('Failed to delete event:', error);
            }
        }
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-[50px] dark:text-gray-200'>
                        No
                    </TableHead>
                    <TableHead className='dark:text-gray-200'>
                        Event Title
                    </TableHead>
                    <TableHead className='dark:text-gray-200'>Date</TableHead>
                    <TableHead className='dark:text-gray-200'>
                        Created At
                    </TableHead>
                    <TableHead className='text-right dark:text-gray-200'>
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {events.map((event, index) => (
                    <TableRow key={event.id}>
                        <TableCell className='font-medium dark:text-gray-200'>
                            {(currentPage - 1) * resultsPerPage + index + 1}
                        </TableCell>
                        <TableCell className='dark:text-gray-200'>
                            {event.title}
                        </TableCell>
                        <TableCell className='dark:text-gray-200'>
                            {event.date}
                        </TableCell>
                        <TableCell className='dark:text-gray-200'>
                            {event.createdAt}
                        </TableCell>
                        <TableCell className='text-right'>
                            <div className='flex justify-end space-x-2'>
                                <Button
                                    variant='outline'
                                    className='dark:border-gray-600 dark:text-gray-200'
                                    onClick={() =>
                                        handleEdit(event.id.toString())
                                    }
                                >
                                    Edit
                                </Button>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant='outline'
                                            className='text-red-600 border-red-600 hover:bg-red-50 dark:text-red-500 dark:border-red-500 dark:hover:bg-red-900'
                                            onClick={() =>
                                                setDeletingEventId(event.id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className='dark:bg-gray-800 dark:border-gray-700'>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle className='dark:text-white'>
                                                Are you sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription className='dark:text-gray-300'>
                                                This action cannot be undone.
                                                This will permanently delete the
                                                event.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel
                                                className='dark:text-gray-200 dark:hover:bg-gray-700 dark:border-gray-600'
                                                onClick={() =>
                                                    setDeletingEventId(null)
                                                }
                                            >
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    variant='outline'
                                                    className='border border-red-600 text-red-600 hover:bg-red-50 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-900'
                                                    onClick={handleDelete}
                                                >
                                                    Delete
                                                </Button>
                                            </AlertDialogTrigger>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
