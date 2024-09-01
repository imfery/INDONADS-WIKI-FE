'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

type TimePickerProps = {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
};

export function TimePicker({ className, value, onChange }: TimePickerProps) {
    const [selectedHour, setSelectedHour] = React.useState<string>('12');
    const [selectedMinute, setSelectedMinute] = React.useState<string>('00');
    const [isOpen, setIsOpen] = React.useState(false);

    const handleTimeSelect = () => {
        const time = `${selectedHour}:${selectedMinute}`;
        onChange?.(time); // Update the form state with the selected time
        setIsOpen(false); // Close the popover
    };

    React.useEffect(() => {
        if (value) {
            const [hour, minute] = value.split(':');
            setSelectedHour(hour);
            setSelectedMinute(minute);
        }
    }, [value]);

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    className={cn(
                        'w-full justify-start text-left font-normal',
                        !value && 'text-muted-foreground',
                        className // Apply the passed className for styling
                    )}
                >
                    {value || 'Select time'}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-4 flex space-x-4'>
                {/* Hour Selection */}
                <ScrollArea className='h-40 w-20'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Hour
                        </label>
                        <div className='mt-1 grid grid-cols-1 gap-2'>
                            {Array.from({ length: 24 }, (_, i) =>
                                String(i).padStart(2, '0')
                            ).map((hour) => (
                                <Button
                                    key={hour}
                                    variant={
                                        selectedHour === hour
                                            ? 'default'
                                            : 'outline'
                                    }
                                    onClick={() => setSelectedHour(hour)}
                                >
                                    {hour}
                                </Button>
                            ))}
                        </div>
                    </div>
                </ScrollArea>

                {/* Minute Selection */}
                <ScrollArea className='h-40 w-20'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Minute
                        </label>
                        <div className='mt-1 grid grid-cols-1 gap-2'>
                            {Array.from({ length: 60 }, (_, i) =>
                                String(i).padStart(2, '0')
                            ).map((minute) => (
                                <Button
                                    key={minute}
                                    variant={
                                        selectedMinute === minute
                                            ? 'default'
                                            : 'outline'
                                    }
                                    onClick={() => setSelectedMinute(minute)}
                                >
                                    {minute}
                                </Button>
                            ))}
                        </div>
                    </div>
                </ScrollArea>

                {/* Confirm Button */}
                <div className='flex flex-col justify-end'>
                    <Button variant='default' onClick={handleTimeSelect}>
                        Set Time
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
