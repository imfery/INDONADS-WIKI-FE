'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import Sidebar from '@/app/components/admin/Sidebar';
import { ToastProvider } from '@/providers/ToastProvider';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ToastProvider>
            <div
                className={cn(
                    'relative min-h-screen bg-white dark:bg-[#121212] dark:text-white'
                )}
            >
                <Sidebar />
                <main className={cn('sm:ml-64 px-4 sm:px-6 lg:px-8')}>
                    {children}
                </main>
            </div>
        </ToastProvider>
    );
};

export default AdminLayout;
