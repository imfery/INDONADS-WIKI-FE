import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import {
    AlertDialog,
    AlertDialogAction,
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
                    <TableHead className='w-[50px]'>No</TableHead>
                    <TableHead>Event Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {events.map((event, index) => (
                    <TableRow key={event.id}>
                        <TableCell className='font-medium'>
                            {(currentPage - 1) * resultsPerPage + index + 1}
                        </TableCell>
                        <TableCell>{event.title}</TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.createdAt}</TableCell>
                        <TableCell className='text-right'>
                            <div className='flex justify-end space-x-2'>
                                <Button
                                    variant='outline'
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
                                            className='text-red-600 border-red-600 hover:bg-red-50'
                                            onClick={() =>
                                                setDeletingEventId(event.id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Are you sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone.
                                                This will permanently delete the
                                                event.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel
                                                onClick={() =>
                                                    setDeletingEventId(null)
                                                }
                                            >
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={handleDelete}
                                            >
                                                Delete
                                            </AlertDialogAction>
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
