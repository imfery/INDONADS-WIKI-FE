import React from 'react';

interface ButtonProps {
    type: 'submit' | 'button';
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    type,
    children,
    className = '',
    onClick,
    disabled = false,
    loading = false,
}) => {
    return (
        <button
            type={type}
            className={`flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${className} ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`} // Add disabled styles
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading ? (
                <svg
                    className='animate-spin h-5 w-5 mr-2 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                >
                    <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                    ></circle>
                    <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8v4l5-5-5-5v4a10 10 0 1010 10h-4l5-5-5 5h4a8 8 0 01-8 8z'
                    ></path>
                </svg>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
