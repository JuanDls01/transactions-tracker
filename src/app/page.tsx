import { Card, CardDescription, CardHeader, CardTitle } from '@/ui/elements/card';
import { PiggyBank } from 'lucide-react';
import React from 'react';

const Home = () => {
  return (
    <main className='h-72 py-10'>
      <Card>
        <CardHeader>
          <CardTitle className='flex gap-x-3'>
            Tu Chanchito <PiggyBank />
          </CardTitle>
          <CardDescription>Esta es la Landing Page de Tu Chanchito</CardDescription>
        </CardHeader>
      </Card>
    </main>
  );
};

export default Home;
