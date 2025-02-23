import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@/app/auth';
import { NavLinks } from './nav-links';
import SessionMenu from '../session-menu';
import TuChanchitoLogo from '../../../../public/TuChanchitoLogo.png';

const Header = async () => {
  const session = await auth();
  return (
    <header className='w-full h-14 py-2 flex justify-center z-10'>
      <div className='container flex w-full justify-between'>
        <div className='flex items-center'>
          <Link href='/'>
            <Image
              src={TuChanchitoLogo}
              alt='TuChanchito Logo'
              width={36}
              height={22}
              className='h-7 aspect-square'
            />
          </Link>
        </div>
        {session?.user && (
          <div className='flex items-center gap-x-10'>
            <NavLinks />
            <SessionMenu user={session.user} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
