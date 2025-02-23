import { Session } from 'next-auth';

/**
 * Returns true if user is authenticated and false if not.
 */
export const getIfUserIsAuthenticated = (session: Session | null) => {
  return !!session && !!session.user;
};
