import NextAuth from 'next-auth';

import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './prisma';

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
  return {
    adapter: PrismaAdapter(prisma),
    providers: [
      // Credentials({
      //   name:"Email",
      //   credentials: {
      //     username: { label: "Username" },
      //     password: { label: "Password", type: "password" },
      //   },
      //   async authorize(credentials, request) {
      //     const username = credentials.username;
      //     const password = credentials.password;

      //     console.log(username);
      //     console.log(password);
      //     //db call
      //     const User = {
      //         name:"DINesh",
      //         id:"1",
      //         email:"idk@gmail,.com"
      //     }

      //     if(User){
      //         return User
      //     } else{
      //         return null
      //     }
      //   },
      // }),
      Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
      }),
    ],
    secret: process.env.AUTH_SECRET,
  };
});
