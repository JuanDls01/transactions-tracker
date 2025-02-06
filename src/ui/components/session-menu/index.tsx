import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/elements/dropdown-menu';
import { Button } from '@/ui/elements/button';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { User } from 'next-auth';
import { signOutAction } from './actions';
import { navLinks } from '../navbar/nav-links';

type SessionMenuProps = {
  user?: User;
};

const SessionMenu = ({ user }: SessionMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='flex items-center justify-center'>
          <p>{user?.name}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {navLinks.map((l) => (
          <DropdownMenuItem key={l.href}>
            <Link href={l.href} className={`text-xs sm:text-sm w-full`}>
              {l.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
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
