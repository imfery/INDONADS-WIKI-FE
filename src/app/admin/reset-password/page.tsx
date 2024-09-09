'use client';

import React, { Suspense, useState } from 'react';
import ResetPasswordForm from '@/app/components/admin/auth/ResetPassword';
import SearchParamsLoader from '@/app/components/admin/SearchParamsLoader';

const ResetPasswordPage: React.FC = () => {
    const [_, setParams] = useState<URLSearchParams | null>(null);

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <SearchParamsLoader onLoad={setParams} />
                <ResetPasswordForm />
            </Suspense>
        </>
    );
};

export default ResetPasswordPage;
