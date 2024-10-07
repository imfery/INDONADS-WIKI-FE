'use client';
import React, { useCallback, useEffect, useState } from 'react';

import AdminLayout from '@/app/layouts/AdminLayouts';
import { fetchAllEvents } from '@/app/utils/api';
import { useToast } from '@/providers/ToastProvider';

import EventTable from '../../components/admin/events/EventTable';
import CustomPagination from '../../components/admin/Pagination';
import SearchAndCreate from '../../components/admin/SearchAndCreate';

import { AllEventsData } from '@/types/index';

const EventsDashboardList: React.FC = () => {
    const [eventsData, setEventsData] = useState<AllEventsData | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10;
    const { success } = useToast();

    const loadEvents = useCallback(async () => {
        try {
            const data = await fetchAllEvents({
                sortField: 'createdAt',
                sortBy: 'desc',
                limit: resultsPerPage,
                page: currentPage,
            });
            setEventsData(data);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error fetching events:', error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }, [currentPage, resultsPerPage]);

    const handleSearch = (query: string) => {
        console.log('Search query:', query);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDeleteSuccess = () => {
        loadEvents();
        success('Event has been successfully deleted', 3000);
    };

    useEffect(() => {
        loadEvents();
    }, [loadEvents]);

    return (
        <AdminLayout>
            <div className='relative overflow-x-auto'>
                <div className='pb-8 bg-white dark:bg-[#121212]'>
                    <div className='p-5'>
                        <h2 className='text-3xl font-semibold text-gray-900 dark:text-gray-200'>
                            Events
                        </h2>
                        <p className='mt-1 text-sm font-normal text-gray-500 dark:text-gray-400'>
                            Manage the list of events shown to the user here.
                        </p>

                        <SearchAndCreate
                            onSearch={handleSearch}
                            createLabel='Create Events'
                            placeholder='Search for events'
                            href='/admin/events/create'
                        />
                        {eventsData ? (
                            <>
                                <EventTable
                                    events={eventsData.events}
                                    currentPage={currentPage}
                                    resultsPerPage={resultsPerPage}
                                    onDeleteSuccess={handleDeleteSuccess}
                                />
                                <CustomPagination
                                    currentPage={currentPage}
                                    resultsPerPage={eventsData.limit}
                                    totalPages={eventsData.totalPages}
                                    totalResults={eventsData.totalResults}
                                    onPageChange={handlePageChange}
                                />
                            </>
                        ) : (
                            <p className='text-center text-gray-500 dark:text-gray-400'>
                                Loading events...
                            </p>
                        )}
                    </div>
                </div>
            </div>{' '}
        </AdminLayout>
    );
};

export default EventsDashboardList;
