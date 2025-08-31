import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@repo/db';
import type { JWT } from 'next-auth/jwt';
import type { Session, User } from 'next-auth';

export const authOptions = {
  providers: [
    // If the first sign-in is via Google the default data saved is: id, name, email and image
    // We can add more profile data by returnning extra fields in profile() callback
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          password: null,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const,
  },
  secret: process.env.AUTH_SECRET,
  // Database Adapter is the bridge to connect Auth.js to our database.
  // Auth.js adapter is a function that receives an ORM/database client and return an object with methods
  adapter: PrismaAdapter(prisma),
  //  By default, the `id` property does not exist on `token` or `session`
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (!session.user) {
        session.user = {};
      }
      session.user.id = token.id as string;
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
