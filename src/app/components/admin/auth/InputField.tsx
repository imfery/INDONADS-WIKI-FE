import { Input } from '@/components/ui/input';
import React, { ChangeEvent } from 'react';

interface InputFieldProps {
    id: string;
    name: string;
    type: string;
    label: string;
    autoComplete?: string;
    required?: boolean;
    placeholder?: string;
    value: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
    id,
    name,
    type,
    label,
    autoComplete,
    required = false,
    placeholder,
    value,
    onChange,
}) => {
    return (
        <div>
            <label
                htmlFor={id}
                className='block text-sm font-medium leading-6 text-gray-100'
            >
                {label}
            </label>
            <div className='mt-2'>
                <Input
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    required={required}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    className='block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 bg-white shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-600 dark:placeholder-gray-500 focus:ring-offset-2'
                />
            </div>
        </div>
    );
};

export default InputField;
