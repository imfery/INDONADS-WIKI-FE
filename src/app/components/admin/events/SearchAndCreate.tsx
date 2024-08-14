import React from 'react';
import Button from '@/components/buttons/Button';

interface SearchAndCreateProps {
  onSearch: (query: string) => void;
  onCreate: () => void;
}

const SearchAndCreate: React.FC<SearchAndCreateProps> = ({
  onSearch,
  onCreate,
}) => {
  return (
    <div className='flex justify-between items-center p-5'>
      <div className='flex-grow'>
        <div className='relative'>
          <label htmlFor='table-search' className='sr-only'>
            Search
          </label>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <svg
              className='w-5 h-5 text-gray-500'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
          <input
            type='text'
            id='table-search'
            className='block w-full max-w-xs p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
            placeholder='Search for events'
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
      <Button variant='primary' className='ml-4' onClick={onCreate}>
        Create Event
      </Button>
    </div>
  );
};

export default SearchAndCreate;
