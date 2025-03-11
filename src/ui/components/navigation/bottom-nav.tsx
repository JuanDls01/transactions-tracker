'use client';
import { JSX } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { getPathActiveClass } from './utils';
import { links } from './nav-links';

type NavItemProps = {
  href: string;
  label?: string;
  pathname: string;
  icon?: JSX.Element;
};

const NavItem = ({ href, pathname, icon, label }: NavItemProps) => {
  return (
    <Link href={href} className={cn('flex flex-col items-center w-20', getPathActiveClass(href, pathname))}>
      {icon}
      {label && <p className='text-xs'>{label}</p>}
    </Link>
  );
};

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'h-20 w-full sm:hidden container pt-2',
        'fixed bottom-0 z-10',
        'bg-[#1A202C]',
        'flex flex-row items-start justify-around',
      )}
    >
      {links.map((link) => (
        <NavItem href={link.href} pathname={pathname} key={link.href} icon={link.icon} label={link.label} />
      ))}
    </nav>
  );
};

export default BottomNav;
