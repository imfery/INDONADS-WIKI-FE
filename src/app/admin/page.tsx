'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import AdminLayout from '@/app/layouts/AdminLayouts';
import { fetchWithAuth } from '@/app/utils/api';

const AdminPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetchWithAuth(
          'http://localhost:3000/api/v1/auth/validate',
          {
            method: 'POST',
          }
        );

        if (response.status === 200) {
          setIsLoading(false);
        } else {
          router.push('/admin/login');
        }
      } catch (error) {
        router.push('/admin/login');
      }
    };

    validateToken();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while validation is in progress
  }

  return (
    <AdminLayout>
      <h1 className='mx-10 my-10'>Dashboard Homepage</h1>
    </AdminLayout>
  );
};

export default AdminPage;
