'use client';

import * as React from 'react';

import Footer from '@/app/Footers';
import Header from '@/app/Headers';
import { ToastProvider } from '@/providers/ToastProvider';

export default function HomePage() {
    return (
        <ToastProvider>
            <main>
                <Header />
                <section className='bg-white mt-16 mb-64'>
                    <div className='container mx-auto px-4'>
                        <div className='mb-8 text-left'>
                            <h1 className='text-3xl font-bold text-gray-900'>
                                About MonadPedia
                            </h1>
                        </div>
                    </div>
                </section>
                <Footer />
            </main>
        </ToastProvider>
    );
}
