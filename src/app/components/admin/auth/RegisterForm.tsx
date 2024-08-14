import Link from 'next/link';
import React from 'react';

import Button from '@/app/components/admin/auth/Button';

import InputField from './InputField';

const RegisterForm: React.FC = () => {
  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Register your account
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form action='#' method='POST' className='space-y-6'>
          <InputField
            id='email'
            name='email'
            type='email'
            label='Email address'
            autoComplete='email'
            required
          />
          <InputField
            id='password'
            name='password'
            type='password'
            label='Password'
            autoComplete='current-password'
            required
          />
          <InputField
            id='re:password'
            name='re:password'
            type='password'
            label='Re-enter Password'
            required
          />
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
