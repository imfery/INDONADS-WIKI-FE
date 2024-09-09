import Link from 'next/link';
import { FC, useState } from 'react';

import NextImage from '@/components/NextImage';

import DesktopNav from '@/app/components/navbar/DesktopNav';
import HamburgerMenu from '@/app/components/navbar/HamburgerMenu';
import MobileNav from '@/app/components/navbar/MobileNav';

import logo from '~/images/MonadPedia.png';

const Header: FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <header className='bg-violet-950 shadow-md py-6 px-4 sticky top-0 z-50'>
            <div className='container mx-auto flex items-center justify-between'>
                <div className='md:hidden absolute right-4 top-4'>
                    <HamburgerMenu isOpen={isOpen} onClick={toggleMenu} />
                </div>

                <div className='flex-1 flex items-center justify-center md:justify-start space-x-4'>
                    <Link href='/'>
                        <NextImage
                            src={logo}
                            alt='Logo'
                            width={50}
                            height={50}
                        />
                    </Link>
                    <Link href='/' className='text-white font-bold text-lg'>
                        Monadpedia
                        <p className='text-xs md:text-sm'>for Indonads</p>
                    </Link>
                </div>

                <div className='hidden md:flex items-center space-x-12'>
                    <DesktopNav />
                </div>

                <MobileNav isOpen={isOpen} onClose={closeMenu} />
            </div>
        </header>
    );
};

export default Header;
