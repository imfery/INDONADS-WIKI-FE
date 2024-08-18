import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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

export default function EventTable({
  events,
  currentPage,
  resultsPerPage,
}: EventTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[50px]'>No</TableHead>
          <TableHead>Event Title</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className='text-right'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event, index) => (
          <TableRow key={event.id}>
            <TableCell className='font-medium'>
              {(currentPage - 1) * resultsPerPage + index + 1}
            </TableCell>
            <TableCell>{event.title}</TableCell>
            <TableCell>{event.date}</TableCell>
            <TableCell>{event.createdAt}</TableCell>
            <TableCell className='text-right'>
              <div className='flex justify-end space-x-2'>
                <Button variant='outline'>Edit</Button>
                <Button
                  variant='outline'
                  className='text-red-600 border-red-600 hover:bg-red-50'
                >
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
