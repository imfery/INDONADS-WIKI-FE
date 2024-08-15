import React from 'react';

import Button from '@/components/buttons/Button';

interface EventTableProps {
  events: Array<{
    id: number;
    title: string;
    date: string;
    createdAt: string;
  }>;
  currentPage: number;
  resultsPerPage: number;
}

const EventTable: React.FC<EventTableProps> = ({
  events,
  currentPage,
  resultsPerPage,
}) => {
  return (
    <table className='w-full text-sm text-left text-gray-500'>
      <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
        <tr>
          <th scope='col' className='px-4 py-3 w-12'>
            No
          </th>
          <th scope='col' className='px-4 py-3'>
            Events Title
          </th>
          <th scope='col' className='px-4 py-3'>
            Date
          </th>
          <th scope='col' className='px-4 py-3'>
            Created At
          </th>
          <th scope='col' className='px-4 py-3 text-right'>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {events.map((event, index) => (
          <tr key={event.id} className='bg-white border-b'>
            <td className='px-4 py-4 font-medium text-gray-900'>
              {(currentPage - 1) * resultsPerPage + index + 1}
            </td>
            <td className='px-4 py-4'>{event.title}</td>
            <td className='px-4 py-4'>{event.date}</td>
            <td className='px-4 py-4'>{event.createdAt}</td>
            <td className='px-4 py-4 text-right'>
              <div className='flex justify-end space-x-2'>
                <Button variant='outline'>Edit</Button>
                <Button
                  variant='outline'
                  className='text-red-600 border-red-600 hover:bg-red-50 active:bg-red-100 disabled:bg-red-100'
                >
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventTable;
