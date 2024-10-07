'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import RegisterForm from '@/app/components/admin/auth/RegisterForm';
import { registerUser } from '@/app/utils/api';
import ToggleDarkMode from '@/components/ToggleDarkMode';

const Page: React.FC = () => {
    const router = useRouter();

    const handleRegister = async (credentials: {
        name: string;
        email: string;
        password: string;
    }) => {
        try {
            const response = await registerUser(credentials);
            if (response.ok) {
                router.push('/admin/login');
            } else {
                console.error('Registration failed:', response.statusText);
            }
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className='relative min-h-screen bg-violet-950 dark:bg-gray-900'>
            <RegisterForm onRegister={handleRegister} />
            <div className='absolute bottom-4 left-4'>
                <ToggleDarkMode />
            </div>
        </div>
    );
};

export default Page;
