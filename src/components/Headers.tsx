import Link from 'next/link';
import { FC } from 'react';
import SearchInput from '@/components/inputs/SearchInput'

const Header: FC = () => {
  return (
    <header className="bg-white shadow-md py-2 px-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="font-bold text-lg text-gray-800">
            Monad
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/about" className="text-gray-800 hover:text-blue-600">
            About
          </Link>
          <Link href="/contact" className="text-gray-800 hover:text-blue-600">
            Contact
          </Link>
          <SearchInput placeholder="Search" />
        </div>
      </div>
    </header>
  );
};

export default Header;
