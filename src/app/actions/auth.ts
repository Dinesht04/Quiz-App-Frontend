// actions/auth.ts
'use server'; // This directive must be at the very top of the file

import { signIn, signOut } from '@/lib/auth';

export async function signInAction() {
  await signIn();
}

export async function signOutAction() {
  await signOut();
}
