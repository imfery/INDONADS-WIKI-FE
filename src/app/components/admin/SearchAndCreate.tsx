import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchAndCreateProps {
    onSearch: (query: string) => void;
    createLabel: string;
    placeholder: string;
    href: string;
}

const SearchAndCreate: React.FC<SearchAndCreateProps> = ({
    onSearch,
    createLabel,
    placeholder,
    href,
}) => {
    return (
        <div className={cn('flex', 'justify-between', 'items-center', 'p-5')}>
            <div className='flex-grow'>
                <Input
                    type='text'
                    placeholder={placeholder}
                    onChange={(e) => onSearch(e.target.value)}
                    className='max-w-xs dark:bg-gray-800 dark:text-white'
                />
            </div>
            <Link href={href}>
                <Button className='ml-4 bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:text-white'>
                    {createLabel}
                </Button>
            </Link>
        </div>
    );
};

export default SearchAndCreate;
