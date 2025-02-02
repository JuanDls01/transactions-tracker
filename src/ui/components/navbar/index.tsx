import { signIn } from '@/app/auth';
import NavLinks from '../nav-links';

export const links = [
  { href: '/', label: 'Inicio' },
  { href: '/transactions', label: 'Transacciones' },
  { href: '/transactions/new', label: 'Cargar' },
];

const Navbar = () => {
  return (
    <div className='flex justify-center h-12 w-full'>
      <div className='container flex justify-end'>
        <div className='flex space-x-4 items-center'>
          <NavLinks links={links} />
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export function SignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google', { redirectTo: '/dashboard' });
      }}
    >
      <button type='submit'>Signin with Google</button>
    </form>
  );
}

export default Navbar;
