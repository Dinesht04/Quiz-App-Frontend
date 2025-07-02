import NextAuth from 'next-auth';
import type { Provider } from "next-auth/providers"
import Google from 'next-auth/providers/google';
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './prisma';

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
  return {
    adapter: PrismaAdapter(prisma),
    pages:{
      signIn:"/signin"
    },
    providers: providers,
    secret: process.env.AUTH_SECRET,
  };
});

const providers: Provider[] = [
  Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
  }),
]

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "credentials")
