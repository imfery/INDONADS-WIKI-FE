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
    ? 'bg-gray-400 text-white'
    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900';

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
