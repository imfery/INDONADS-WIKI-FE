'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { logoutUser } from '@/app/utils/api';
import SidebarItem from './SidebarItem';
import ToggleDarkMode from '@/components/ToggleDarkMode';

const Sidebar: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        try {
            await logoutUser();
            router.push('/admin/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <aside
            id='default-sidebar'
            className='fixed top-0 left-0 z-40 w-64 h-screen bg-violet-950 shadow-lg border-r border-gray-200 dark:bg-[#18181B] dark:border-gray-700'
            aria-label='Sidebar'
        >
            <div className='h-full flex flex-col justify-between px-4 py-6'>
                <ul className='space-y-4'>
                    <SidebarItem
                        href='/admin'
                        label='Home'
                        isActive={pathname === '/admin'}
                    />
                    <SidebarItem
                        href='/admin/events'
                        label='Events'
                        isActive={pathname === '/admin/events'}
                    />
                    <SidebarItem
                        href='/admin/articles'
                        label='Articles'
                        isActive={pathname === '/admin/articles'}
                    />
                    <SidebarItem
                        href='/admin/monad-madness'
                        label='Monad Madness'
                        isActive={pathname === '/admin/monad-madness'}
                    />
                    <SidebarItem
                        href='/admin/spaces'
                        label='Spaces'
                        isActive={pathname === '/admin/spaces'}
                    />
                </ul>

                <div className='mt-auto pt-4'>
                    <ToggleDarkMode />
                    <SidebarItem onClick={handleLogout} label='Logout' />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
