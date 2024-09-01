import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';

interface HamburgerMenuProps {
    isOpen: boolean;
    onClick: () => void;
}

const HamburgerMenu: FC<HamburgerMenuProps> = ({ isOpen, onClick }) => {
    return (
        <button
            className='md:hidden py-5 px-1 text-white'
            onClick={onClick}
            aria-label='Toggle menu'
        >
            {isOpen ? (
                <XMarkIcon className='h-7 w-7' />
            ) : (
                <Bars3Icon className='h-7 w-7' />
            )}
        </button>
    );
};

export default HamburgerMenu;
