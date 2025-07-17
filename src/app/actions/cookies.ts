'use server';

import { cookies } from 'next/headers';
import { auth } from '@/lib/auth';

type Data = {
  guestUser: string;
  guestUsername: string;
};

type MyCookieData = {
  guestUser: string | null;
  guestUsername: string | null;
};

export async function checkAuthJsCookie(): Promise<boolean> {
  const cookieStore = await cookies();
  // return cookieStore.has('authjs.session-token'); -> for dec
  // return cookieStore.has('_Secure-authjs.session-token'); //-> for prod
  const session = await auth();
  return !!session;
}

export async function setMyCookie(data: Data)  {
  const cookieStore = await cookies();
  const time = 60 * 60 * 24;
  cookieStore.set('guestUser', data.guestUser, { maxAge: time });
  cookieStore.set('guestUsername', data.guestUsername, { maxAge: time });
}

export async function checkMyCookie(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.has('guestUser');
}

export async function getMyCookie(): Promise<MyCookieData> {
  const cookieStore = await cookies();

  const guestUser = cookieStore.get('guestUser');
  const guestUsername = cookieStore.get('guestUsername');

  const data = {
    guestUser: guestUser?.value || null, // Access .value property and handle null
    guestUsername: guestUsername?.value || null,
  };
  return data;
}

export async function deleteMyCookies() {
  const cookieStore = await cookies();
  cookieStore.delete('guestUser');
  cookieStore.delete('guestUsername');
}
