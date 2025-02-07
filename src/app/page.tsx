import SignInButton from '@/ui/components/signin-button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/ui/elements/card';
import { PiggyBank } from 'lucide-react';
import React from 'react';
import { auth } from './auth';
import Link from 'next/link';

const Home = async () => {
  const session = await auth();
  const isLoggedIn = session && session.user;

  return (
    <main className='h-72 py-10'>
      <Card>
        <CardHeader>
          <CardTitle className='flex gap-x-3'>
            Tu Chanchito <PiggyBank />
          </CardTitle>
          <CardDescription>Esta es la Landing Page de Tu Chanchito</CardDescription>
          {isLoggedIn ? <Link href='/dashboard'>Ir al dashboard</Link> : <SignInButton />}
        </CardHeader>
      </Card>
    </main>
  );
};

export default Home;
