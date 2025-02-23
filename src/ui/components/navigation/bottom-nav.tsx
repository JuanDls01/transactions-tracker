'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/elements/dialog';
import { ArrowRightLeft, Landmark, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getPathActiveClass } from './utils';
import TransactionForm from '../transaction-form';

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'h-20 w-full sm:hidden container pt-2',
        'fixed bottom-0 z-10',
        'bg-[#1A202C]',
        'grid grid-cols-3 justify-start',
      )}
    >
      <div className='flex flex-col items-center'>
        <Link
          href={'/dashboard'}
          className={cn('flex flex-col items-center w-20', getPathActiveClass('/dashboard', pathname))}
        >
          <Landmark width={30} height={30} />
          <p className='text-xs'>Inicio</p>
        </Link>
      </div>
      <Dialog>
        <DialogTrigger
          className={cn(
            'flex items-center justify-center',
            'w-16 aspect-square rounded-full',
            'border-8 border-[#1A202C]',
            'absolute -top-6 left-1/2 -translate-x-1/2',
            'bg-[#7ed08d]',
          )}
        >
          <ArrowRightLeft className='font-bold' />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar transacción</DialogTitle>
            <DialogDescription>Aquí puedes registrar tus transacciones</DialogDescription>
          </DialogHeader>
          <TransactionForm />
        </DialogContent>
      </Dialog>
      <div className='flex flex-col items-center col-start-3'>
        <Link
          href={'/transactions'}
          className={cn('flex flex-col items-center w-20', getPathActiveClass('/transactions', pathname))}
        >
          <List width={30} height={30} />
          <p className='text-xs'>Movimientos</p>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
