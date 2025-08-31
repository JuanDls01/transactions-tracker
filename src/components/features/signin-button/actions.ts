'use server';
import { signIn } from '@/app/auth';

export const signInAction = async () => {
  await signIn('google', { redirectTo: '/dashboard' });
};
