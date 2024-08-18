'use client';
import React from 'react';

import Sidebar from '@/app/components/admin/Sidebar';

const EventsCreateForm: React.FC = () => {
  return (
    <div className='relative min-h-screen bg-white'>
      <Sidebar />
      <main className='sm:ml-64 px-4 sm:px-6 lg:px-8'>
        <div className='relative overflow-x-auto'>
          <div className='pb-8 bg-white'>
            <div className='p-5'>
              <h2 className='text-3xl font-semibold text-gray-900'>Events</h2>
              <p className='mt-1 text-sm font-normal text-gray-500'>
                Create an event by filling the form.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventsCreateForm;
