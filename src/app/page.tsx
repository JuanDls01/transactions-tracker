import SignInButton from '@/ui/components/signin-button';
import { auth } from './auth';
import Link from 'next/link';
import { Button } from '@/ui/elements/button';

const Home = async () => {
  const session = await auth();
  const isLoggedIn = session && session.user;

  return (
    <main className='container'>
      <section className='w-full py-16'>
        <div className='max-w-xl'>
          <h1 className='mt-4 md:mt-6 text-3xl font-extrabold'>
            Toma el control de tus finanzas de manera fácil y rápida 💸
          </h1>
          <p className='mt-4 md:mt-6 text-base/7 text-muted-foreground'>
            Registra tus ingresos y gastos, visualiza tus hábitos financieros y ahorra de forma inteligente
            con TuChanchito.
          </p>
          <div className='mt-4 md:mt-6'>
            {isLoggedIn ? (
              <Button>
                <Link href='/dashboard'>Empecemos</Link>
              </Button>
            ) : (
              <SignInButton />
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
