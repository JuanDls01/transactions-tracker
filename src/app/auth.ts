import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

export const authOptions = {
  providers: [
    // If the first sign-in is via Google the default data saved is: id, name, email and image
    // We can add more profile data by returnning extra fields in profile() callback
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      profile(profile, tokens) {
        console.log('profile: ', profile, tokens);
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
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
