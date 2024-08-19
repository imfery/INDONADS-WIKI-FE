import Link from 'next/link';
import React from 'react';

<<<<<<< HEAD
import Button from '@/components/buttons/Button';
=======
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button'; // Assuming you have this component
import { Input } from '@/components/ui/input'; // Assuming you have this component
>>>>>>> 5a912f09b7d08db78bb527c977f2dd325496593a

interface SearchAndCreateProps {
  onSearch: (query: string) => void;
  onCreate: () => void;
}

const SearchAndCreate: React.FC<SearchAndCreateProps> = ({
  onSearch,
  onCreate,
}) => {
  return (
    <div className={cn('flex', 'justify-between', 'items-center', 'p-5')}>
      <div className='flex-grow'>
        <Input
          type='text'
          placeholder='Search for events'
          onChange={(e) => onSearch(e.target.value)}
          className='max-w-xs'
        />
      </div>
      <Link href='/admin/events/create'>
<<<<<<< HEAD
        <Button variant='primary' className='ml-4' onClick={onCreate}>
=======
        <Button className='ml-4' onClick={onCreate}>
>>>>>>> 5a912f09b7d08db78bb527c977f2dd325496593a
          Create Event
        </Button>
      </Link>
    </div>
  );
};

export default SearchAndCreate;
