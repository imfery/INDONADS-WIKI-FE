import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button'; // Assuming you have this component
import { Input } from '@/components/ui/input'; // Assuming you have this component

interface SearchAndCreateProps {
  onSearch: (query: string) => void;
  onCreate: () => void;
  createLabel: string;
  placeholder: string;
  href: string;
}

const SearchAndCreate: React.FC<SearchAndCreateProps> = ({
  onSearch,
  onCreate,
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
          className='max-w-xs'
        />
      </div>
      <Link href={href}>
        <Button className='ml-4' onClick={onCreate}>
          {createLabel}
        </Button>
      </Link>
    </div>
  );
};

export default SearchAndCreate;
