'use client';
import React, { useEffect, useState, useCallback } from 'react';

import ArticlesTable from '@/app/components/admin/articles/ArticlesTable';
import CustomPagination from '@/app/components/admin/Pagination';
import SearchAndCreate from '@/app/components/admin/SearchAndCreate';
import AdminLayout from '@/app/layouts/AdminLayouts';
import { fetchAllArticles } from '@/app/utils/api';
import { useToast } from '@/providers/ToastProvider';

import { AllArticlesData } from '@/types';

const ArticlesDashboardList: React.FC = () => {
    const [articlesData, setArticlesData] = useState<AllArticlesData | null>(
        null
    );
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10;
    const { success, error } = useToast();

    const loadArticles = useCallback(async () => {
        try {
            const data = await fetchAllArticles({
                sortBy: 'desc',
                limit: resultsPerPage,
                page: currentPage,
            });
            setArticlesData(data);
        } catch (err) {
            if (err instanceof Error) {
                console.error('Error fetching articles:', err.message);
                error('Error fetching articles');
            } else {
                console.error('Unexpected error:', err);
            }
        }
    }, [currentPage, error, resultsPerPage]);

    const handleSearch = (query: string) => {
        console.log('Search query:', query);
    };

    const handleCreate = () => {
        console.log('Create articles clicked');
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDeleteSuccess = () => {
        loadArticles();
        success('Articles has been successfully deleted', 3000);
    };

    useEffect(() => {
        loadArticles();
    }, [loadArticles]);

    return (
        <AdminLayout>
            <div className='relative overflow-x-auto'>
                <div className='pb-8 bg-white'>
                    <div className='p-5'>
                        <h2 className='text-3xl font-semibold text-gray-900'>
                            Articles
                        </h2>
                        <p className='mt-1 text-sm font-normal text-gray-500'>
                            Manage the list of articles articles shown to the
                            user here.
                        </p>

                        <SearchAndCreate
                            onSearch={handleSearch}
                            onCreate={handleCreate}
                            createLabel='Create Articles'
                            placeholder='Search for articles'
                            href='/admin/articles/create'
                        />
                        {articlesData ? (
                            <>
                                <ArticlesTable
                                    articles={articlesData.articles}
                                    currentPage={currentPage}
                                    resultsPerPage={resultsPerPage}
                                    onDeleteSuccess={handleDeleteSuccess}
                                />
                                <CustomPagination
                                    currentPage={currentPage}
                                    totalPages={articlesData.totalPages}
                                    totalResults={articlesData.totalResults}
                                    onPageChange={handlePageChange}
                                />
                            </>
                        ) : (
                            <p className='text-center text-gray-500'>
                                Loading articles...
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ArticlesDashboardList;
