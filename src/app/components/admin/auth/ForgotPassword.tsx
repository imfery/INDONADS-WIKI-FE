'use client';
import React, { FormEvent, useState } from 'react';
import Button from '@/app/components/admin/auth/Button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import InputField from './InputField';
import { requestPasswordReset } from '@/app/utils/api';

const ForgotPasswordForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        try {
            await requestPasswordReset(email);
            setSuccessMessage(
                'Password reset link has been sent to your email.'
            );
        } catch (error) {
            setErrorMessage((error as Error).message);
        }
    };

    return (
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-violet-950 dark:bg-gray-900'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100'>
                    Forgot password
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
                        id='email'
                        name='email'
                        type='email'
                        label='Email address'
                        autoComplete='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <div>
                        <Button type='submit'>
                            Send password reset request
                        </Button>
                    </div>
                    <div className='text-sm'>
                        <a
                            href='/admin/login'
                            className='font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300'
                        >
                            Back to login page
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;
