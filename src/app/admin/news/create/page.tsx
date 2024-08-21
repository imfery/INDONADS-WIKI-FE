'use client';
import React from 'react';

import Tiptap from '@/app/components/admin/tiptap/Tiptap';
import AdminLayout from '@/app/layouts/AdminLayouts';

const NewsDashboardList: React.FC = () => {
  return (
    <AdminLayout>
      <div className='relative overflow-x-auto'>
        <div className='pb-8 bg-white'>
          <div className='p-5'>
            <h2 className='text-3xl font-semibold text-gray-900'>News</h2>
            <p className='mt-1 text-sm font-normal text-gray-500'>
              Create a news from scratch here!
            </p>
            <div className='space-y-6 w-3/4 mt-10'>
              <Tiptap />
            </div>
            {/* Additional components and logic would go here */}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewsDashboardList;
