import { signIn } from '@/app/auth';
import { Button } from '@/ui/elements/button';

const SignInButton = () => {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google', { redirectTo: '/dashboard' });
      }}
    >
      <Button type='submit' variant='outline'>
        Iniciar Sesión
      </Button>
    </form>
  );
};

export default SignInButton;
