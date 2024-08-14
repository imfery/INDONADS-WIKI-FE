import React from 'react';

import Sidebar from '@/app/components/admin/Sidebar';

const AdminPage: React.FC = () => {
  return (
    <div className='relative min-h-screen bg-white-100'>
      <Sidebar />
      <main className='sm:ml-64'>{/* <Content /> */}</main>
    </div>
  );
};

export default AdminPage;
