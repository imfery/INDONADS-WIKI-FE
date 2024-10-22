'use client';
import React, { useCallback, useEffect, useState } from 'react';
import AdminLayout from '@/app/layouts/AdminLayouts';
import { fetchAllSpaces } from '@/app/utils/api';
import { useToast } from '@/providers/ToastProvider';

import SpacesTable from '../../components/admin/spaces/spacesTable';
import SearchAndCreate from '../../components/admin/SearchAndCreate';

import { AllSpacesData } from '@/types/index';

const SpacesDashboardList: React.FC = () => {
    const [spacesData, setSpacesData] = useState<AllSpacesData | null>(null);
    const { success } = useToast();

    const loadSpaces = useCallback(async () => {
        try {
            const response = await fetchAllSpaces({
                sortField: 'createdAt',
                sortBy: 'desc',
            });

            setSpacesData(response);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error fetching spaces:', error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }, []);

    const handleDeleteSuccess = () => {
        loadSpaces();
        success('Entry successfully deleted', 3000);
    };

    useEffect(() => {
        loadSpaces();
    }, [loadSpaces]);

    return (
        <AdminLayout>
            <div className='relative overflow-x-auto'>
                <div className='pb-8 bg-white dark:bg-[#121212]'>
                    <div className='p-5'>
                        <h2 className='text-3xl font-semibold text-gray-900 dark:text-gray-200'>
                            Spaces
                        </h2>
                        <p className='mt-1 text-sm font-normal text-gray-500 dark:text-gray-400'>
                            Manage the Spaces entries.
                        </p>

                        <SearchAndCreate
                            onSearch={(query) =>
                                console.log('Search query:', query)
                            }
                            createLabel='Create Space'
                            placeholder='Search Spaces'
                            href='/admin/spaces/create'
                        />
                        {spacesData ? (
                            <SpacesTable
                                spaces={spacesData.data || []}
                                onDeleteSuccess={handleDeleteSuccess}
                            />
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

export default SpacesDashboardList;
