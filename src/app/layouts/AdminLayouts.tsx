'use client';

import React from 'react';

import Sidebar from '@/app/components/admin/Sidebar';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='relative min-h-screen bg-white-100'>
      <Sidebar />
      <main className='sm:ml-64'>{children}</main>
    </div>
  );
};

export default AdminLayout;
