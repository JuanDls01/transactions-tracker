import { signOut } from '@/app/auth';
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
import { links } from '../navbar';
import { User } from 'next-auth';

type SessionMenuProps = {
  user: User;
};

const SessionMenu = ({ user }: SessionMenuProps) => {
  console.log({ user });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='flex items-center justify-center'>
          <p>{user.name}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {links.map((l) => (
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
            onClick={async () => {
              'use server';
              await signOut();
            }}
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
