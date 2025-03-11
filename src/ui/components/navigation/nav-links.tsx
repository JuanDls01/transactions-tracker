'use client';
import { ArrowRightLeft, ChartNoAxesCombined, Home, Sheet } from 'lucide-react';
import Link from 'next/link';
import { JSX } from 'react';
import { getPathActiveClass } from './utils';
import { usePathname } from 'next/navigation';

export type NavLinkType = {
  href: string;
  label: string;
  icon: JSX.Element;
};

export const links = [
  { href: '/home', label: 'Inicio', icon: <Home /> },
  {
    href: '/transactions/new',
    label: 'Cargar',
    icon: <ArrowRightLeft className='font-bold' />,
  },
  { href: '/dashboard', label: 'Dashboard', icon: <ChartNoAxesCombined /> },
  { href: '/transactions', label: 'Movimientos', icon: <Sheet /> },
];

export const NavLinks = () => {
  const pathname = usePathname();

  return (
    <div className='hidden sm:flex gap-5'>
      {links.map((link) => (
        <Link key={link.href} href={link.href} className={getPathActiveClass(link.href, pathname)}>
          {link.label}
        </Link>
      ))}
    </div>
  );
};
