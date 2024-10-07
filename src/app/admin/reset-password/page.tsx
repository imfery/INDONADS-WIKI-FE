'use client';

import React, { Suspense, useState } from 'react';
import ResetPasswordForm from '@/app/components/admin/auth/ResetPassword';
import SearchParamsLoader from '@/app/components/admin/SearchParamsLoader';
import ToggleDarkMode from '@/components/ToggleDarkMode';

const ResetPasswordPage: React.FC = () => {
    const [_, setParams] = useState<URLSearchParams | null>(null);

    return (
        <div className='relative min-h-screen bg-violet-950 dark:bg-gray-900'>
            <Suspense fallback={<div>Loading...</div>}>
                <SearchParamsLoader onLoad={setParams} />
                <ResetPasswordForm />
            </Suspense>
            <div className='absolute bottom-4 left-4'>
                <ToggleDarkMode />
            </div>
        </div>
    );
};

export default ResetPasswordPage;
