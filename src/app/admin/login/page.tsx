'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import LoginForm from '@/app/components/admin/auth/LoginForm';
import { loginUser } from '@/app/utils/api';
import ToggleDarkMode from '@/components/ToggleDarkMode';

const LoginPage: React.FC = () => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleLogin = async (credentials: {
        email: string;
        password: string;
    }) => {
        try {
            const user = await loginUser(credentials);
            if (user) {
                router.push('/admin');
            }
        } catch (error: any) {
            console.error('Login failed:', error);
            setErrorMessage(error.message);
        }
    };

    return (
        <div className='relative min-h-screen bg-violet-950 dark:bg-gray-900'>
            <LoginForm onLogin={handleLogin} errorMessage={errorMessage} />
            <div className='absolute bottom-0 left-0 p-4'>
                <ToggleDarkMode />
            </div>
        </div>
    );
};

export default LoginPage;
