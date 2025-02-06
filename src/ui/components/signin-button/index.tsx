import { Button } from '@/ui/elements/button';
import { signInAction } from './actions';

const SignInButton = () => {
  return (
    <form action={signInAction}>
      <Button type='submit' variant='outline'>
        Iniciar Sesión
      </Button>
    </form>
  );
};

export default SignInButton;
