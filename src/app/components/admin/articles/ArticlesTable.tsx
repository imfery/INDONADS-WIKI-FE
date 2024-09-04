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

import { deleteArticlesById } from '@/app/utils/api'; // Ensure you have a delete function for articles

interface ArticlesTableProps {
    articles: Array<{
        id: string;
        title: string;
        createdAt: string;
        isActive: boolean;
    }>;
    currentPage: number;
    resultsPerPage: number;
    onDeleteSuccess: () => void;
}

export default function ArticlesTable({
    articles = [], // Set default value to an empty array to prevent undefined error
    currentPage,
    resultsPerPage,
    onDeleteSuccess,
}: ArticlesTableProps) {
    const router = useRouter();
    const [deletingArticlesId, setDeletingArticlesId] = useState<string | null>(
        null
    );

    const handleEdit = (id: string) => {
        router.push(`/admin/articles/edit?id=${id}`);
    };

    const handleDelete = async () => {
        if (deletingArticlesId !== null) {
            try {
                await deleteArticlesById(deletingArticlesId);
                onDeleteSuccess(); // Trigger refresh after deletion and show toast
                setDeletingArticlesId(null); // Reset after deletion
            } catch (error) {
                console.error('Failed to delete articles:', error);
            }
        }
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-[50px]'>No</TableHead>
                    <TableHead>Articles Title</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {/* Add a check to ensure articles is an array before mapping */}
                {articles && articles.length > 0 ? (
                    articles.map((item, index) => (
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
                                                    setDeletingArticlesId(
                                                        item.id
                                                    )
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
                                                    permanently delete the
                                                    articles item.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel
                                                    onClick={() =>
                                                        setDeletingArticlesId(
                                                            null
                                                        )
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
                            No articles available.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
