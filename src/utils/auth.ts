import { auth } from '@/app/auth';
import type { Session } from 'next-auth';
import { AuthenticationError } from '@/lib/errors';

/**
 * Returns true if user is authenticated and false if not.
 */
export const getIfUserIsAuthenticated = (session: Session | null) => {
  return !!session && !!session.user;
};

export const getAuthenticatedUser = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    throw new AuthenticationError();
  }
  return session.user.id;
};

// Higher-order function that wraps functions requiring authentication
export const withAuth = <T, A extends unknown[]>(fn: (userId: string, ...args: A) => Promise<T>) => {
  return async (...args: A) => {
    const userId = await getAuthenticatedUser();
    return fn(userId, ...args);
  };
};
