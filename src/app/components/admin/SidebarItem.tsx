import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';

interface SidebarItemProps {
    href?: string;
    label: string;
    onClick?: () => void;
    isActive?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    href,
    label,
    onClick,
    isActive,
}) => {
    const baseClasses =
        'flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors';

    const activeClasses = isActive
        ? 'bg-gray-400 text-white dark:bg-gray-700 dark:text-white'
        : 'text-gray-300 hover:bg-violet-800 hover:text-white dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white';

    return (
        <li>
            <Link
                href={href || '#'}
                onClick={onClick}
                className={cn(baseClasses, activeClasses)}
            >
                <span>{label}</span>
            </Link>
        </li>
    );
};

export default SidebarItem;
