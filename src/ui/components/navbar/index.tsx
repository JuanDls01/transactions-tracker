import { auth } from '@/app/auth';
import BottomNav from './bottom-nav';
import TopNav from './top-nav';

const Navbar = async () => {
  const session = await auth();
  if (!session || !session.user) return;

  return (
    <>
      <div className='absolute top-0 left-0 w-full h-14 bg-[#156359] opacity-20 blur-3xl -translate-y-1/2 sm:-translate-y-0'></div>
      <TopNav user={session.user} />
      <BottomNav />
    </>
  );
};

export default Navbar;
