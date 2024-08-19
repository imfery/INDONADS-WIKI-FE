'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import RegisterForm from '@/app/components/admin/auth/RegisterForm';
import { registerUser } from '@/app/utils/api';

const Page: React.FC = () => {
  const router = useRouter();

  const handleRegister = async (credentials: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await registerUser(credentials);

      if (response.ok) {
        router.push('/admin/login');
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return <RegisterForm onRegister={handleRegister} />;
};

export default Page;
