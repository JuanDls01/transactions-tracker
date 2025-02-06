import SessionMenu from '../../session-menu';
import SignInButton from '../../signin-button';
import { User } from 'next-auth';

type DesktopNavPropsType = {
  user: User;
};

const DesktopNav = ({ user }: DesktopNavPropsType) => (
  <div className='hidden sm:flex justify-center h-12 w-full'>
    <div className='container flex justify-end'>
      <div className='flex space-x-4 items-center'>
        {user ? <SessionMenu user={user} /> : <SignInButton />}
      </div>
    </div>
  </div>
);
export default DesktopNav;
