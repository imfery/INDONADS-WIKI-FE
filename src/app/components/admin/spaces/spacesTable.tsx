'use client';

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

import { deleteSpaceById } from '@/app/utils/api';

interface SpacesTableProps {
    spaces: Array<{
        id: string;
        category: string;
    }>;
    onDeleteSuccess: () => void;
}

export default function SpacesTable({
    spaces = [],
    onDeleteSuccess,
}: SpacesTableProps) {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleEdit = (id: string) => {
        router.push(`/admin/spaces/edit?id=${id}`);
    };

    const handleDelete = async () => {
        if (deletingId !== null) {
            try {
                const response = await deleteSpaceById(deletingId);

                if (response === null) {
                    onDeleteSuccess();
                }

                setDeletingId(null);
            } catch (error) {
                console.error('Failed to delete entry:', error);
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
                        Category
                    </TableHead>

                    <TableHead className='text-right dark:text-gray-200'>
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {spaces && spaces.length > 0 ? (
                    spaces.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell className='font-medium dark:text-gray-200'>
                                {index + 1}
                            </TableCell>
                            <TableCell className='dark:text-gray-200'>
                                {item.category}
                            </TableCell>
                            <TableCell className='text-right'>
                                <div className='flex justify-end space-x-2'>
                                    <Button
                                        variant='outline'
                                        className='dark:border-gray-600 dark:text-gray-200'
                                        onClick={() => handleEdit(item.id)}
                                    >
                                        Edit
                                    </Button>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant='outline'
                                                className='border border-red-600 text-red-600 hover:bg-red-50 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-900'
                                                onClick={() =>
                                                    setDeletingId(item.id)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className='dark:bg-gray-800'>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className='dark:text-white'>
                                                    Are you sure?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription className='dark:text-gray-300'>
                                                    This action cannot be
                                                    undone. This will
                                                    permanently delete the
                                                    entry.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel
                                                    className='dark:text-gray-200 dark:hover:bg-gray-700 dark:border-gray-600'
                                                    onClick={() =>
                                                        setDeletingId(null)
                                                    }
                                                >
                                                    Cancel
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    className='border border-red-600 text-red-600 hover:bg-red-50 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-900'
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
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={4}
                            className='text-center dark:text-gray-200'
                        >
                            No entries available.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
