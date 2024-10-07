'use client';
import React, { useCallback, useEffect, useState } from 'react';
import AdminLayout from '@/app/layouts/AdminLayouts';
import { fetchAllMonadMadness } from '@/app/utils/api';
import { useToast } from '@/providers/ToastProvider';

import MonadMadnessTable from '../../components/admin/monadMadness/MonadMadnessTable';
import CustomPagination from '../../components/admin/Pagination';
import SearchAndCreate from '../../components/admin/SearchAndCreate';

import { AllMonadMadnessData } from '@/types/index';

const MonadMadnessDashboardList: React.FC = () => {
    const [monadMadnessData, setMonadMadnessData] =
        useState<AllMonadMadnessData | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10;
    const { success } = useToast();

    const loadMonadMadness = useCallback(async () => {
        try {
            const response = await fetchAllMonadMadness({
                sortField: 'createdAt',
                sortBy: 'desc',
                limit: resultsPerPage,
                page: currentPage,
            });

            setMonadMadnessData(response.data);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error fetching Monad Madness:', error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }, [currentPage, resultsPerPage]);

    const handleDeleteSuccess = () => {
        loadMonadMadness();
        success('Entry successfully deleted', 3000);
    };

    useEffect(() => {
        loadMonadMadness();
    }, [loadMonadMadness]);

    return (
        <AdminLayout>
            <div className='relative overflow-x-auto'>
                <div className='pb-8 bg-white dark:bg-[#121212]'>
                    <div className='p-5'>
                        <h2 className='text-3xl font-semibold text-gray-900 dark:text-gray-200'>
                            Monad Madness
                        </h2>
                        <p className='mt-1 text-sm font-normal text-gray-500 dark:text-gray-400'>
                            Manage the Monad Madness entries.
                        </p>

                        <SearchAndCreate
                            onSearch={(query) =>
                                console.log('Search query:', query)
                            }
                            createLabel='Create Monad Madness'
                            placeholder='Search Monad Madness'
                            href='/admin/monad-madness/create'
                        />
                        {monadMadnessData ? (
                            <>
                                <MonadMadnessTable
                                    participants={
                                        monadMadnessData.participants || []
                                    }
                                    currentPage={currentPage}
                                    resultsPerPage={resultsPerPage}
                                    onDeleteSuccess={handleDeleteSuccess}
                                />
                                <CustomPagination
                                    currentPage={currentPage}
                                    resultsPerPage={resultsPerPage}
                                    totalPages={monadMadnessData.totalPages}
                                    totalResults={monadMadnessData.totalResults}
                                    onPageChange={setCurrentPage}
                                />
                            </>
                        ) : (
                            <p className='text-center text-gray-500 dark:text-gray-400'>
                                Loading entries...
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default MonadMadnessDashboardList;
