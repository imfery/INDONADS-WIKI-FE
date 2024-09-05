'use client';

import React, { FormEvent, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import Button from '@/app/components/admin/auth/Button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import InputField from './InputField';
import { resetPassword } from '@/app/utils/api';

const ResetPasswordForm: React.FC = () => {
    const searchParams = useSearchParams();
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const token = searchParams.get('token');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        if (!token) {
            setErrorMessage('Invalid or missing token.');
            return;
        }

        try {
            await resetPassword(token, password);
            setSuccessMessage('Your password has been successfully reset.');
        } catch (error) {
            setErrorMessage((error as Error).message);
        }
    };

    return (
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                    Reset your password
                </h2>
                {errorMessage && (
                    <Alert variant='destructive' className='mt-4'>
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                )}
                {successMessage && (
                    <Alert variant='default' className='mt-4'>
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{successMessage}</AlertDescription>
                    </Alert>
                )}
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form
                    onSubmit={handleSubmit}
                    method='POST'
                    className='space-y-6'
                >
                    <InputField
                        id='password'
                        name='password'
                        type='password'
                        label='New Password'
                        autoComplete='new-password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div>
                        <Button type='submit'>Reset Password</Button>
                    </div>
                    <div className='text-sm'>
                        <a
                            href='/admin/login'
                            className='font-semibold text-indigo-600 hover:text-indigo-500'
                        >
                            Back to login page
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordForm;
