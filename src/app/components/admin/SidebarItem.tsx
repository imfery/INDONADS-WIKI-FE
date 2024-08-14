import React from 'react';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, icon, label }) => {
  return (
    <li>
      <a
        href={href}
        className="flex items-center p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 group text-gray-700"
      >
        <div className="w-5 h-5 transition duration-75 group-hover:text-gray-900">
          {icon}
        </div>
        <span className="ms-3 group-hover:text-gray-900">{label}</span>
      </a>
    </li>
  );
};

export default SidebarItem;
