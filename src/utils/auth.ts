import { auth } from '@/app/auth';
import { Session } from 'next-auth';

/**
 * Returns true if user is authenticated and false if not.
 */
export const getIfUserIsAuthenticated = (session: Session | null) => {
  return !!session && !!session.user;
};

export const getAuthenticatedUser = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }
  return session.user.id;
};

export const withAuth = <T>(fn: (userId: string) => Promise<T>) => {
  return async () => {
    const userId = await getAuthenticatedUser();
    return fn(userId);
  };
};
