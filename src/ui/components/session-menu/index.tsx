import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/elements/dropdown-menu';
import { Button } from '@/ui/elements/button';
import { ChevronDown, LogOut } from 'lucide-react';
import { User } from 'next-auth';
import { signOutAction } from './actions';
import Image from 'next/image';

type SessionMenuProps = {
  user?: User;
};

const SessionMenu = ({ user }: SessionMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='outline-none '>
        <Button
          variant='ghost'
          className='flex items-center justify-center rounded-full gap-1 px-1 py-0.5 h-10 bg-[#171923]'
        >
          <Image src={user?.image ?? ''} alt='user image' width={35} height={35} className='rounded-full' />
          <ChevronDown className='size-4 font-bold' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className='p-0'>
          <Button
            variant='ghost'
            onClick={signOutAction}
            className='px-2 py-1.5 w-full flex justify-between text-xs sm:text-sm'
          >
            Log Out <LogOut />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SessionMenu;
