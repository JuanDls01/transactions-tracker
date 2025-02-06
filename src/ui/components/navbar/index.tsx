import { auth } from '@/app/auth';
import clsx from 'clsx';
import MobileNav from './mobile-nav';
import DesktopNav from './desktop-nav';

const Navbar = async () => {
  const session = await auth();
  if (!session || !session.user) return;

  return (
    <header
      className={clsx(
        'w-full h-14',
        'flex items-center',
        'fixed bottom-0 sm:top-0 border-t sm:border-b',
        'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
      )}
    >
      <DesktopNav user={session.user} />
      <MobileNav />
    </header>
  );
};

export default Navbar;
