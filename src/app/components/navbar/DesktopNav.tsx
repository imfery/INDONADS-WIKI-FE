import Link from 'next/link';
import { FC } from 'react';

// import SearchInput from '@/components/inputs/SearchInput';

const DesktopNav: FC = () => {
    return (
        <>
            <nav className='hidden md:flex items-center space-x-12'>
                <Link
                    href='/spaces'
                    className='text-white hover:text-neutral-300'
                >
                    Spaces
                </Link>
            </nav>
            <nav className='hidden md:flex items-center space-x-12'>
                <Link
                    href='/motw'
                    className='cursor-not-allowed text-gray-400'
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    Memes of The Week
                </Link>
            </nav>
            <nav className='hidden md:flex items-center space-x-12'>
                <Link
                    href='https://discord.gg/n5Yg2qe9Zd'
                    className='text-white hover:text-neutral-300'
                >
                    Feedback/Feature Request
                </Link>
            </nav>
            <nav className='hidden md:flex items-center space-x-12'>
                <Link
                    href='/about'
                    className='text-white hover:text-neutral-300'
                >
                    About
                </Link>
            </nav>
        </>
    );
};

export default DesktopNav;
