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

import { deleteNewsById } from '@/app/utils/api'; // Ensure you have a delete function for news

interface NewsTableProps {
    news: Array<{
        id: string;
        title: string;
        createdAt: string;
        isActive: boolean;
    }>;
    currentPage: number;
    resultsPerPage: number;
    onDeleteSuccess: () => void;
}

export default function NewsTable({
    news = [], // Set default value to an empty array to prevent undefined error
    currentPage,
    resultsPerPage,
    onDeleteSuccess,
}: NewsTableProps) {
    const router = useRouter();
    const [deletingNewsId, setDeletingNewsId] = useState<string | null>(null);

    const handleEdit = (id: string) => {
        router.push(`/admin/news/edit?id=${id}`);
    };

    const handleDelete = async () => {
        if (deletingNewsId !== null) {
            try {
                await deleteNewsById(deletingNewsId);
                onDeleteSuccess(); // Trigger refresh after deletion and show toast
                setDeletingNewsId(null); // Reset after deletion
            } catch (error) {
                console.error('Failed to delete news:', error);
            }
        }
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-[50px]'>No</TableHead>
                    <TableHead>News Title</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {/* Add a check to ensure news is an array before mapping */}
                {news && news.length > 0 ? (
                    news.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell className='font-medium'>
                                {(currentPage - 1) * resultsPerPage + index + 1}
                            </TableCell>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.createdAt}</TableCell>
                            <TableCell>
                                {item.isActive ? 'Yes' : 'No'}
                            </TableCell>
                            <TableCell className='text-right'>
                                <div className='flex justify-end space-x-2'>
                                    <Button
                                        variant='outline'
                                        onClick={() => handleEdit(item.id)}
                                    >
                                        Edit
                                    </Button>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant='outline'
                                                className='text-red-600 border-red-600 hover:bg-red-50'
                                                onClick={() =>
                                                    setDeletingNewsId(item.id)
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
                                                    This action cannot be
                                                    undone. This will
                                                    permanently delete the news
                                                    item.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel
                                                    onClick={() =>
                                                        setDeletingNewsId(null)
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
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} className='text-center'>
                            No news available.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
