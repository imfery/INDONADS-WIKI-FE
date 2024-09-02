'use client';
import React, { useEffect, useState, useCallback } from 'react';

import NewsTable from '@/app/components/admin/news/NewsTable';
import CustomPagination from '@/app/components/admin/Pagination';
import SearchAndCreate from '@/app/components/admin/SearchAndCreate';
import AdminLayout from '@/app/layouts/AdminLayouts';
import { fetchAllNews } from '@/app/utils/api';
import { useToast } from '@/providers/ToastProvider';

import { AllNewsData } from '@/types';

const NewsDashboardList: React.FC = () => {
    const [newsData, setNewsData] = useState<AllNewsData | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10;
    const { success, error } = useToast();

    const loadNews = useCallback(async () => {
        try {
            const data = await fetchAllNews({
                sortBy: 'desc',
                limit: resultsPerPage,
                page: currentPage,
            });
            setNewsData(data);
        } catch (err) {
            if (err instanceof Error) {
                console.error('Error fetching news:', err.message);
                error('Error fetching news');
            } else {
                console.error('Unexpected error:', err);
            }
        }
    }, [currentPage, error, resultsPerPage]);

    const handleSearch = (query: string) => {
        console.log('Search query:', query);
    };

    const handleCreate = () => {
        console.log('Create news clicked');
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDeleteSuccess = () => {
        loadNews();
        success('News has been successfully deleted', 3000);
    };

    useEffect(() => {
        loadNews();
    }, [loadNews]);

    return (
        <AdminLayout>
            <div className='relative overflow-x-auto'>
                <div className='pb-8 bg-white'>
                    <div className='p-5'>
                        <h2 className='text-3xl font-semibold text-gray-900'>
                            News
                        </h2>
                        <p className='mt-1 text-sm font-normal text-gray-500'>
                            Manage the list of news articles shown to the user
                            here.
                        </p>

                        <SearchAndCreate
                            onSearch={handleSearch}
                            onCreate={handleCreate}
                            createLabel='Create News'
                            placeholder='Search for news'
                            href='/admin/news/create'
                        />
                        {newsData ? (
                            <>
                                <NewsTable
                                    news={newsData.news}
                                    currentPage={currentPage}
                                    resultsPerPage={resultsPerPage}
                                    onDeleteSuccess={handleDeleteSuccess}
                                />
                                <CustomPagination
                                    currentPage={currentPage}
                                    totalPages={newsData.totalPages}
                                    totalResults={newsData.totalResults}
                                    onPageChange={handlePageChange}
                                />
                            </>
                        ) : (
                            <p className='text-center text-gray-500'>
                                Loading news...
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default NewsDashboardList;
