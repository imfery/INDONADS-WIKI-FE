'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import AdminLayout from '@/app/layouts/AdminLayouts';
import { validateToken } from '@/app/utils/api';

const AdminPage: React.FC = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const validateUserToken = async () => {
            try {
                const response = await validateToken();

                if (response.status === 200) {
                    setIsLoading(false);
                } else {
                    router.push('/admin/login');
                }
            } catch (error) {
                router.push('/admin/login');
            }
        };

        validateUserToken();
    }, [router]);

    if (isLoading) {
        return <div className='dark:text-gray-200'>Loading...</div>;
    }

    return (
        <AdminLayout>
            <div className='relative overflow-x-auto'>
                <div className='pb-8 bg-white dark:bg-[#121212]'>
                    <div className='p-5'>
                        <h2 className='text-3xl font-semibold text-gray-900 dark:text-gray-200'>
                            Dashboard Homepage
                        </h2>
                        <p className='mt-1 text-sm font-normal text-gray-500 dark:text-gray-400'>
                            This is the homepage
                        </p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminPage;
