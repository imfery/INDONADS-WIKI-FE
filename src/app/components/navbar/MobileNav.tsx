import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/solid'; // Import the arrow icon
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { LightbulbIcon, MoonStarsIcon } from '@/components/icons/DarkModeIcons';
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from '@/components/ui/collapsible';

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileNav: FC<MobileNavProps> = ({ isOpen, onClose }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false); // State to control the "More" section

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'enabled') {
            setIsDarkMode(true);
            document.body.classList.add('dark');
        }
    }, []);

    const toggleMode = () => {
        setIsDarkMode(!isDarkMode);
        if (!isDarkMode) {
            document.body.classList.add('dark');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('darkMode', 'disabled');
        }
    };

    const toggleMoreSection = () => {
        setIsMoreOpen(!isMoreOpen);
    };

    return (
        <div
            className={`fixed inset-0 bg-violet-950 dark:bg-[#18181B] z-40 md:hidden transition-transform ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
            <nav className='flex flex-col items-center py-6'>
                <button
                    className='self-end p-4 text-white dark:text-white'
                    onClick={onClose}
                    aria-label='Close menu'
                >
                    <XMarkIcon className='h-6 w-6' />
                </button>
                <Link
                    href='/spaces'
                    className='text-white dark:text-white text-lg py-2'
                    onClick={onClose}
                >
                    Spaces
                </Link>
                <Link
                    href='/monad-madness'
                    className='text-white dark:text-white text-lg py-2'
                    onClick={onClose}
                >
                    Monad Madness
                </Link>
                <Link
                    href='/motw'
                    className='text-white dark:text-white text-lg py-2'
                    onClick={onClose}
                >
                    Memes of The Week
                </Link>

                <Collapsible open={isMoreOpen} onOpenChange={toggleMoreSection}>
                    <CollapsibleTrigger className='w-full text-center flex justify-center items-center py-2'>
                        <span className='text-white dark:text-white hover:text-neutral-300 dark:hover:text-neutral-300'>
                            More
                        </span>
                        <ChevronDownIcon
                            className={`ml-2 h-5 w-5 transition-transform ${
                                isMoreOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                        />
                    </CollapsibleTrigger>
                    <CollapsibleContent className='p-4 w-full text-center dark:bg-[#18181B]'>
                        <Link
                            href='/about'
                            className='hover:text-neutral-300'
                            onClick={onClose}
                        >
                            About
                        </Link>
                        <Link
                            href='https://discord.gg/n5Yg2qe9Zd'
                            className='hover:text-neutral-300 mt-2 block'
                            onClick={onClose}
                        >
                            Feedback/Feature Request
                        </Link>
                    </CollapsibleContent>
                </Collapsible>
            </nav>

            <nav className='flex flex-col items-center py-6'>
                {/* Toggle Dark Mode */}
                <div className='flex items-center space-x-2 py-2'>
                    {isDarkMode ? <MoonStarsIcon /> : <LightbulbIcon />}
                    <Switch checked={isDarkMode} onCheckedChange={toggleMode} />
                </div>
            </nav>
        </div>
    );
};

export default MobileNav;
