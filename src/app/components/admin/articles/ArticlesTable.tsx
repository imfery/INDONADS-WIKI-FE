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
                    <TableHead className='w-[50px]'>No</TableHead>
                    <TableHead>Articles Title</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {articles && articles.length > 0 ? (
                    articles.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell className='font-medium'>
                                {(currentPage - 1) * resultsPerPage + index + 1}
                            </TableCell>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.createdAt}</TableCell>
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
