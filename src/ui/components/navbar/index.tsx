import { auth } from '@/app/auth';
import SessionMenu from '../session-menu';
import SignInButton from '../signin-button';

export const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/transactions', label: 'Transacciones' },
  { href: '/transactions/new', label: 'Cargar' },
];

const Navbar = async () => {
  const session = await auth();

  return (
    <div className='flex justify-center h-12 w-full'>
      <div className='container flex justify-end'>
        <div className='flex space-x-4 items-center'>
          {session ? <SessionMenu user={session.user} /> : <SignInButton />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
