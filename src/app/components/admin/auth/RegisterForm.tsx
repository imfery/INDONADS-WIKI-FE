'use client';
import Link from 'next/link';
import React, { FormEvent, useState } from 'react';

import Button from '@/app/components/admin/auth/Button';

import InputField from './InputField';

interface RegisterFormProps {
    onRegister: (credentials: {
        name: string;
        email: string;
        password: string;
    }) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rePassword, setRePassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (password !== rePassword) {
            setError('Passwords do not match');
            return;
        }
        setError(null);
        onRegister({ name, email, password });
    };

    return (
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                    Register your account
                </h2>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form
                    onSubmit={handleSubmit}
                    method='POST'
                    className='space-y-6'
                >
                    <InputField
                        id='name'
                        name='name'
                        type='text'
                        label='Name'
                        autoComplete='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
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
                    <InputField
                        id='password'
                        name='password'
                        type='password'
                        label='Password'
                        autoComplete='current-password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <InputField
                        id='re-password'
                        name='re-password'
                        type='password'
                        label='Re-enter Password'
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                        required
                    />
                    {error && <p className='text-red-500 text-sm'>{error}</p>}
                    <div>
                        <Button type='submit'>Register</Button>
                    </div>
                </form>
                <p className='mt-10 text-center text-sm text-gray-500'>
                    Have registered already?{' '}
                    <Link
                        href='/admin/login'
                        className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
                    >
                        Try signing in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;
