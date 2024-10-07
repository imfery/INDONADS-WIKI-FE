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

const LightbulbIcon = () => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        fill='currentColor'
        viewBox='0 0 16 16'
        className='w-5 h-5 text-white'
    >
        <path d='M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1' />
    </svg>
);

const MoonStarsIcon = () => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        fill='currentColor'
        viewBox='0 0 16 16'
        className='w-5 h-5 text-white'
    >
        <path d='M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286' />
        <path d='M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z' />
    </svg>
);

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
                        <NavigationMenuContent className='p-4 rounded-md shadow-lg left-0 w-[300px]'>
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
