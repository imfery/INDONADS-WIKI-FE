'use client';

import React from 'react';

import Sidebar from '@/app/components/admin/Sidebar';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const router = useRouter();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const checkAdminAccess = async () => {
  //     try {
  //       // Example condition to set Authorization header
  //       const token = document.cookie
  //         .split('; ')
  //         .find((row) => row.startsWith('authToken='))
  //         ?.split('=')[1];

  //       const headers = {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`, // Correctly use the template literal syntax
  //       };

  //       const response = await fetch(
  //         'http://localhost:5000/v1/auth/verify-admin',
  //         {
  //           method: 'GET',
  //           credentials: 'include', // Include cookies in the request
  //           headers: headers,
  //         }
  //       );

  //       if (!response.ok) {
  //         router.push('/admin/login'); // Redirect to login if not authorized
  //       } else {
  //         setLoading(false); // User is authenticated, proceed to show the content
  //       }
  //     } catch (error) {
  //       console.error('Error verifying admin access:', error);
  //       router.push('/admin/login'); // Redirect to login on error
  //     }
  //   };

  //   checkAdminAccess();
  // }, [router]);

  // // Optional: Show a loading indicator while checking authentication
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className='relative min-h-screen bg-white-100'>
      <Sidebar />
      <main className='sm:ml-64'>{children}</main>
    </div>
  );
};

export default AdminLayout;
