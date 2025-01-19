'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { links } from '../navbar';

type NavLinksPropsType = {
  links: typeof links;
};

const NavLinks = ({ links }: NavLinksPropsType) => {
  const pathname = usePathname();
  return (
    <>
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={`text-sm sm:text-base ${pathname === l.href ? 'text-white font-medium' : 'text-muted-foreground font-light'}`}
        >
          {l.label}
        </Link>
      ))}
    </>
  );
};

export default NavLinks;
