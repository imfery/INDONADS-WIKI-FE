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
import { Switch } from '@/components/ui/switch';

import { deleteArticlesById, updateArticles } from '@/app/utils/api';

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
    onUpdateStatus: (status: string) => void;
}

export default function ArticlesTable({
    articles = [],
    currentPage,
    resultsPerPage,
    onDeleteSuccess,
    onUpdateStatus,
}: ArticlesTableProps) {
    const router = useRouter();
    const [deletingArticlesId, setDeletingArticlesId] = useState<string | null>(
        null
    );
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const handleEdit = (id: string) => {
        router.push(`/admin/articles/edit?id=${id}`);
    };

    const handleDelete = async () => {
        if (deletingArticlesId !== null) {
            try {
                await deleteArticlesById(deletingArticlesId);
                onDeleteSuccess();
                setDeletingArticlesId(null);
            } catch (error) {
                console.error('Failed to delete articles:', error);
            }
        }
    };

    const handleToggle = async (id: string, currentState: boolean) => {
        setUpdatingId(id);
        try {
            await updateArticles(id, { isActive: !currentState });

            if (!currentState) {
                const toStatus = 'Active';
                onUpdateStatus(toStatus);
            } else {
                const toStatus = 'Inactive';
                onUpdateStatus(toStatus);
            }
        } catch (error) {
            console.error('Failed to change article status:', error);
        } finally {
            setUpdatingId(null);
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
                        Articles Title
                    </TableHead>
                    <TableHead className='dark:text-gray-200'>
                        Created At
                    </TableHead>
                    <TableHead className='dark:text-gray-200'>Active</TableHead>
                    <TableHead className='text-right dark:text-gray-200'>
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {articles && articles.length > 0 ? (
                    articles.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell className='font-medium dark:text-gray-200'>
                                {(currentPage - 1) * resultsPerPage + index + 1}
                            </TableCell>
                            <TableCell className='dark:text-gray-200'>
                                {item.title}
                            </TableCell>
                            <TableCell className='dark:text-gray-200'>
                                {item.createdAt}
                            </TableCell>
                            <TableCell>
                                <Switch
                                    checked={item.isActive}
                                    onCheckedChange={() =>
                                        handleToggle(item.id, item.isActive)
                                    }
                                    disabled={updatingId === item.id}
                                />
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
                                                    setDeletingArticlesId(
                                                        item.id
                                                    )
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
                                                    articles item.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel
                                                    className='dark:text-gray-200 dark:hover:bg-gray-700 dark:border-gray-600'
                                                    onClick={() =>
                                                        setDeletingArticlesId(
                                                            null
                                                        )
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
                            colSpan={5}
                            className='text-center dark:text-gray-200'
                        >
                            No articles available.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
