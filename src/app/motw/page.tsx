'use client';

import * as React from 'react';
import Footer from '@/components/Footers';
import Header from '@/components/Headers';
import { ToastProvider } from '@/providers/ToastProvider';

export default function MotwPage() {
    return (
        <ToastProvider>
            <main className='dark:bg-[#121212] dark:text-white'>
                <Header />
                <section className='bg-white dark:bg-[#121212] mt-16 mb-64'>
                    <div className='container mx-auto px-4'>
                        <div className='mb-8 text-left'>
                            <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
                                MOTW Coming soon
                            </h1>
                        </div>
                    </div>
                </section>
                <Footer />
            </main>
        </ToastProvider>
    );
}
