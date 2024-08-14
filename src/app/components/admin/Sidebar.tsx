'use client';

import React from 'react';
import SidebarItem from './SidebarItem';
import { logoutUser } from '@/app/utils/api';
import { useRouter } from 'next/navigation';

const Sidebar: React.FC = () => {
  const router = useRouter();

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
      className='fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0'
      aria-label='Sidebar'
    >
      <div className='h-full px-3 py-4 overflow-y-auto bg-violet-50'>
        <ul className='space-y-2 font-medium'>
          <SidebarItem
            href='#'
            icon={
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 22 21'
              >
                <path d='M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z' />
                <path d='M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z' />
              </svg>
            }
            label='Home'
          />
          <SidebarItem
            href='#'
            icon={
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M3 12l2.5-2.5L9 13l6-6 6 6-6 6-6-6-3 3-3-3z' />
              </svg>
            }
            label='Events'
          />
          <SidebarItem
            href='#'
            icon={
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.33-8 4v2h16v-2c0-2.67-5.33-4-8-4z' />
              </svg>
            }
            label='Team'
          />
          <SidebarItem
            href='#'
            icon={
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0-6a6 6 0 0 0-6 6 6 6 0 0 0 0 12 6 6 0 0 0 6 6 6 6 0 0 0 6-6 6 6 0 0 0 0-12 6 6 0 0 0-6-6z' />
              </svg>
            }
            label='News'
          />
          <SidebarItem
            onClick={handleLogout}
            icon={
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M12 3v2.5a6.5 6.5 0 0 1 0 13V21h-2v-2.5a6.5 6.5 0 0 1 0-13V3h2zm-4 1v2.5a4.5 4.5 0 0 0 0 9V18a4.5 4.5 0 0 0 0-9V4H8zm10 7.5v-2h-4v2h2v7h-2v2h4v-2h-2v-7h2z' />
              </svg>
            }
            label='Logout'
          />
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
