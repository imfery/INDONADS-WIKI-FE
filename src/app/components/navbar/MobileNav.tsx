import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { FC } from 'react';

// import SearchInput from '@/components/inputs/SearchInput';

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileNav: FC<MobileNavProps> = ({ isOpen, onClose }) => {
    return (
        <div
            className={`fixed inset-0 bg-violet-950 z-40 md:hidden transition-transform ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
            <nav className='flex flex-col items-center py-6'>
                <button
                    className='self-end p-4 text-white'
                    onClick={onClose}
                    aria-label='Close menu'
                >
                    <XMarkIcon className='h-6 w-6' />
                </button>
                <Link
                    href='/spaces'
                    className='text-white text-lg py-2'
                    onClick={onClose}
                >
                    Spaces
                </Link>
                <Link
                    href='https://discord.gg/n5Yg2qe9Zd'
                    className='text-white text-lg py-2'
                    onClick={onClose}
                >
                    Feedback/Feature Request
                </Link>
            </nav>
            <nav className='flex flex-col items-center py-6'>
                <Link
                    href='/about'
                    className='text-white text-lg py-2'
                    onClick={onClose}
                >
                    About
                </Link>
                {/* <div className='py-2 px-4 w-full'>
                    <SearchInput placeholder='Search (WIP)' />
                </div> */}
            </nav>
        </div>
    );
};

export default MobileNav;
