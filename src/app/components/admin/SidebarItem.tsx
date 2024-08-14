import React from 'react';
import Link from 'next/link';

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
    'flex items-center p-2 rounded-lg transition-colors duration-200 group';

  const activeClasses = isActive
    ? 'bg-gray-300 text-black'
    : 'text-gray-500 hover:bg-gray-100 hover:text-black';

  return (
    <li>
      <Link
        href={href || '#'}
        onClick={onClick}
        className={`${baseClasses} ${activeClasses}`}
      >
        <span className='ml-8'>{label}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;
