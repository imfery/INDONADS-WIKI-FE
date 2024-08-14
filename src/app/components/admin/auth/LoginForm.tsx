import Link from 'next/link';
import React from 'react';

import Button from '@/app/components/admin/auth/Button';

import InputField from './InputField';

const LoginForm: React.FC = () => {
  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Sign in to your account
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

          <div>
            <InputField
              id='password'
              name='password'
              type='password'
              label='Password'
              autoComplete='current-password'
              required
            />
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'
              ></label>
              <div className='text-sm'>
                <a
                  href='#'
                  className='font-semibold text-indigo-600 hover:text-indigo-500'
                >
                  Forgot password?
                </a>
              </div>
            </div>
          </div>
          <div>
            <Button type='submit'>Sign in</Button>
          </div>
        </form>

        <p className='mt-10 text-center text-sm text-gray-500'>
          Not a member?{' '}
          <Link
            href='/admin/register'
            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
