'use server';

import { cookies } from 'next/headers';

type Data = {
  guestUser: string;
  guestUsername: string;
};

export async function setMyCookie(data: Data) {
  const cookieStore = await cookies();
  cookieStore.set('guestUser', data.guestUser);
  cookieStore.set('guestUsername', data.guestUsername);
}

export async function checkMyCookie(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.has('guestUser');
}

export async function getMyCookie(): Promise<any> {
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
