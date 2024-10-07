import Link from 'next/link';
import { FC, useState, useEffect } from 'react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { LightbulbIcon, MoonStarsIcon } from '@/components/icons/DarkModeIcons';

const ToggleDarkMode: FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

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

    return (
        <div className='flex items-center space-x-2'>
            {isDarkMode ? <MoonStarsIcon /> : <LightbulbIcon />}
            <Switch checked={isDarkMode} onCheckedChange={toggleMode} />
        </div>
    );
};

const DesktopNav: FC = () => {
    return (
        <nav className='hidden md:flex items-center space-x-12'>
            <Link href='/spaces' className='text-white hover:text-neutral-300'>
                Spaces
            </Link>
            <Link
                href='/monad-madness'
                className='text-white hover:text-neutral-300'
            >
                Monad Madness
            </Link>
            <Link
                href='/motw'
                className='cursor-not-allowed text-gray-400'
                onClick={(e) => {
                    e.preventDefault();
                }}
            >
                Memes of The Week
            </Link>

            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className='bg-transparent text-white hover:text-neutral-300 hover:bg-transparent focus:bg-transparent active:bg-transparent'>
                            More
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className='p-4 rounded-md shadow-lg left-0 w-[300px] dark:bg-[#18181B]'>
                            <div className='flex flex-col space-y-2'>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href='/about'
                                        className='hover:text-neutral-300'
                                    >
                                        About
                                    </Link>
                                </NavigationMenuLink>
                                <Separator className='my-2' />
                                <NavigationMenuLink asChild>
                                    <Link
                                        href='https://discord.gg/n5Yg2qe9Zd'
                                        className='hover:text-neutral-300'
                                    >
                                        Feedback/Feature Request
                                    </Link>
                                </NavigationMenuLink>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuIndicator />
                </NavigationMenuList>
                <NavigationMenuViewport />
            </NavigationMenu>
            <ToggleDarkMode />
        </nav>
    );
};

export default DesktopNav;
