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
            <iframe
                width='100%'
                height='120'
                src='https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Fbolan999%2Findonads-mixtape-christmas-edition%2F'
                frameBorder='0'
                allow='autoplay'
                className='rounded-md'
            ></iframe>
        </CardContent>
    </Card>
);

export default Mixtape;
