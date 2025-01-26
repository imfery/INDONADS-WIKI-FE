import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Mixtape: React.FC = () => (
    <Card className='bg-white dark:bg-[#18181B] shadow-md rounded-lg mb-8'>
        <CardHeader className='border-b border-gray-200 dark:border-gray-600'>
            <CardTitle className='text-xl-2 font-semibold text-gray-900 dark:text-white'>
                Listen to Indonads Mixtape
            </CardTitle>
        </CardHeader>
        <CardContent className='p-4'>
            <div className='flex flex-col md:flex-row items-center md:items-start gap-4'>
                <div className='w-full'>
                    <iframe
                        width='100%'
                        height='120'
                        src='https://player-widget.mixcloud.com/widget/iframe/?feed=%2Fbolan999%2Fmonad-mixtape-cny-edition%2F'
                        frameBorder='0'
                        allow='autoplay'
                        className='rounded-md'
                    ></iframe>
                </div>
            </div>
        </CardContent>
    </Card>
);

export default Mixtape;
