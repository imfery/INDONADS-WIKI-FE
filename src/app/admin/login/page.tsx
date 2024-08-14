'use client';
import { useRouter } from 'next/navigation';
import LoginForm from '@/app/components/admin/auth/LoginForm';
import { loginUser } from '@/app/utils/api';

const LoginPage: React.FC = () => {
  const router = useRouter();

  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await loginUser(credentials);

      if (response.ok) {
        router.push('/admin');
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default LoginPage;
