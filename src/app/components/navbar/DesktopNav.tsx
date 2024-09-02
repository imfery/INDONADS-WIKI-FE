import Link from 'next/link';
import { FC } from 'react';

import SearchInput from '@/components/inputs/SearchInput';

const DesktopNav: FC = () => {
    return (
        <nav className='hidden md:flex items-center space-x-12'>
            <Link href='/about' className='text-white hover:text-neutral-300'>
                Contribute
            </Link>
            <Link href='/contact' className='text-white hover:text-neutral-300'>
                Follow Us
            </Link>
            <SearchInput placeholder='Search (WIP)' />
        </nav>
    );
};

export default DesktopNav;
