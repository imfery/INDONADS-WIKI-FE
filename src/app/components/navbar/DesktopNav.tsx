import Link from 'next/link';
import { FC } from 'react';
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
import { Separator } from '@/components/ui/separator';
import ToggleDarkMode from '@/components/ToggleDarkMode';

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
