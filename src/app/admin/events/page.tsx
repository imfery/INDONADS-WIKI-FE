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
                sortField: 'updatedAt',
                sortBy: 'desc',
                limit: resultsPerPage,
                page: currentPage,
            });
            setEventsData(data); // Set the correct type
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error fetching events:', error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }, [currentPage, resultsPerPage]); // Dependencies of the useCallback hook

    const handleSearch = (query: string) => {
        console.log('Search query:', query);
        // Implement search logic here
    };

    const handleCreate = () => {
        console.log('Create event clicked');
        // Implement create event logic here
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDeleteSuccess = () => {
        loadEvents(); // Refresh the event list after deletion
        success('Event has been successfully deleted', 3000);
    };

    useEffect(() => {
        loadEvents();
    }, [loadEvents]); // Add loadEvents to the dependency array

    return (
        <AdminLayout>
            <div className='relative overflow-x-auto'>
                <div className='pb-8 bg-white'>
                    <div className='p-5'>
                        <h2 className='text-3xl font-semibold text-gray-900'>
                            Events
                        </h2>
                        <p className='mt-1 text-sm font-normal text-gray-500'>
                            Manage the list of events shown to the user here.
                        </p>

                        <SearchAndCreate
                            onSearch={handleSearch}
                            onCreate={handleCreate}
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
                                    onDeleteSuccess={handleDeleteSuccess} // Pass the delete success callback
                                />
                                <CustomPagination
                                    currentPage={currentPage}
                                    totalPages={eventsData.totalPages}
                                    totalResults={eventsData.totalResults}
                                    onPageChange={handlePageChange}
                                />
                            </>
                        ) : (
                            <p className='text-center text-gray-500'>
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
