// LoginForm.tsx
import React, { FormEvent, useState } from 'react';
import Button from '@/app/components/admin/auth/Button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import InputField from './InputField';

interface LoginFormProps {
    onLogin: (credentials: {
        email: string;
        password: string;
    }) => Promise<void>;
    errorMessage: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, errorMessage }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await onLogin({ email, password });
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-violet-950 dark:bg-gray-900'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100'>
                    Sign in to your account
                </h2>
                {errorMessage && (
                    <Alert variant='destructive' className='mt-4'>
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{errorMessage}</AlertDescription>
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
                    <div className='flex items-center justify-between'>
                        <div className='text-sm'>
                            <a
                                href='/admin/forgot-password'
                                className='font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300'
                            >
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <Button
                        type='submit'
                        disabled={isLoading}
                        className='w-full'
                    >
                        {isLoading ? (
                            <Loader2 className='animate-spin' />
                        ) : (
                            'Sign in'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
