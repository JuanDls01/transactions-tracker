'use client';

import SessionMenu from '../../session-menu';
import { User } from 'next-auth';
import { navLinks } from '../nav-links';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getPathActiveClass } from '../utils';
import { cn } from '@/lib/utils';

type TopNavPropsType = {
  user?: User;
};

const TopNav = ({ user }: TopNavPropsType) => {
  const pathname = usePathname();
  return (
    <nav className={cn('w-full container py-2', 'flex items-center sm:justify-between')}>
      {user && <SessionMenu user={user} />}
      <div className='hidden sm:flex gap-5'>
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className={getPathActiveClass(link.href, pathname)}>
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};
export default TopNav;
