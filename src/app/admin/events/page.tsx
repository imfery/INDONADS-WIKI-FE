'use client';
import React, { useEffect, useState } from 'react';

import Sidebar from '@/app/components/admin/Sidebar';
import { fetchAllEvents } from '@/app/utils/api';

import EventTable from '../../components/admin/events/EventTable';
import SearchAndCreate from '../../components/admin/events/SearchAndCreate';
import Pagination from '../../components/admin/Pagination';

import { AllEventsData } from '@/types/index';

const EventsDashboardList: React.FC = () => {
  const [eventsData, setEventsData] = useState<AllEventsData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

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

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchAllEvents({
          sortField: 'createdAt',
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
    };

    loadEvents();
  }, [currentPage]);

  return (
    <div className='relative min-h-screen bg-white'>
      <Sidebar />
      <main className='sm:ml-64 px-4 sm:px-6 lg:px-8'>
        <div className='relative overflow-x-auto'>
          <div className='pb-8 bg-white'>
            <div className='p-5'>
              <h2 className='text-xl-2 font-semibold text-gray-900'>Events</h2>
              <p className='mt-1 text-sm font-normal text-gray-500'>
                Manage the list of events shown to the user here.
              </p>
            </div>
            <SearchAndCreate onSearch={handleSearch} onCreate={handleCreate} />
            {eventsData ? (
              <>
                <EventTable
                  events={eventsData.events}
                  currentPage={currentPage}
                  resultsPerPage={resultsPerPage}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={eventsData.totalPages}
                  totalResults={eventsData.totalResults}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <p className='text-center text-gray-500'>Loading events...</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventsDashboardList;
