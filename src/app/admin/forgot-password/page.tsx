'use client';

import React from 'react';
import ForgotPasswordForm from '@/app/components/admin/auth/ForgotPassword';
import ToggleDarkMode from '@/components/ToggleDarkMode';

const ForgotPasswordPage: React.FC = () => {
    return (
        <div className='relative min-h-screen bg-violet-950 dark:bg-gray-900'>
            <ForgotPasswordForm />
            <div className='absolute bottom-4 left-4'>
                <ToggleDarkMode />
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
