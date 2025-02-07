'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '../nav-links';

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <div className='h-20 sm:hidden container flex pt-2 justify-around w-full'>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`flex flex-col items-center min-w-20 ${link.href === pathname ? 'text-[#7ed08d] font-bold' : 'text-gray-400'}`}
        >
          {link.icon}
          <p className='text-xs'>{link.label}</p>
        </Link>
      ))}
    </div>
  );
};

export default MobileNav;
