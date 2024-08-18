'use client';

import React from 'react';

import { cn } from '@/lib/utils'; // Utility to merge class names

import Sidebar from '@/app/components/admin/Sidebar';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={cn('relative min-h-screen flex bg-background')}>
      <Sidebar />
      <main className={cn('flex-1 ml-64 p-6')}>{children}</main>
    </div>
  );
};

export default AdminLayout;
