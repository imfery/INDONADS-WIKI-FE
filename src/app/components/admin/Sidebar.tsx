'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'; // Import usePathname to get the current path
import React from 'react';

import { logoutUser } from '@/app/utils/api'; // Ensure you have this import

import SidebarItem from './SidebarItem';

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path

  const handleLogout = async () => {
    try {
      await logoutUser(); // Call your logout API

      router.push('/admin/login'); // Redirect to the login page after logout
    } catch (error) {
      console.error('Logout failed:', error); // Handle errors here
    }
  };

  return (
    <aside
      id='default-sidebar'
      className='fixed top-0 left-0 z-40 w-64 h-screen bg-white text-black transition-transform -translate-x-full sm:translate-x-0 border-r border-gray-300'
      aria-label='Sidebar'
    >
      <div className='h-full flex flex-col justify-between px-3 py-4 overflow-y-auto'>
        <ul className='space-y-2'>
          <div className='border-b border-gray-300 pb-2'>
            <SidebarItem
              href='/admin'
              label='Home'
              isActive={pathname === '/admin/home'}
            />
          </div>
          <div className='border-b border-gray-300 pb-2'>
            <SidebarItem
              href='/admin/events'
              label='Events'
              isActive={pathname === '/admin/events'}
            />
          </div>
          <div className='border-b border-gray-300 pb-2'>
            <SidebarItem
              href='/admin/team'
              label='Team'
              isActive={pathname === '/admin/team'}
            />
          </div>
          <div className='border-b border-gray-300 pb-2'>
            <SidebarItem
              href='/admin/news'
              label='News'
              isActive={pathname === '/admin/news'}
            />
          </div>
        </ul>
        <div className='border-t border-gray-300 pt-2 pb-14'>
          <SidebarItem
            onClick={handleLogout} // This triggers the logout functionality
            href=''
            label='Logout'
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
