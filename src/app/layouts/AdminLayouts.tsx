'use client';

import React from 'react';

import { cn } from '@/lib/utils'; // Utility to merge class names

import Sidebar from '@/app/components/admin/Sidebar';
import { ToastProvider } from '@/providers/ToastProvider'; // Adjust the path as needed

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ToastProvider>
            <div className={cn('relative min-h-screen bg-white')}>
                <Sidebar />
                <main className={cn('sm:ml-64 px-4 sm:px-6 lg:px-8')}>
                    {children}
                </main>
            </div>
        </ToastProvider>
    );
};

export default AdminLayout;
