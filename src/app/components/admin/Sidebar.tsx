'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import { logoutUser } from '@/app/utils/api';

import SidebarItem from './SidebarItem';

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
      className='fixed top-0 left-0 z-40 w-64 h-screen bg-white shadow-lg border-r border-gray-200'
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
            href='/admin/team'
            label='Team'
            isActive={pathname === '/admin/team'}
          />
          <SidebarItem
            href='/admin/news'
            label='News'
            isActive={pathname === '/admin/news'}
          />
        </ul>
        <div className='mt-auto pt-4'>
          <SidebarItem onClick={handleLogout} label='Logout' />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
