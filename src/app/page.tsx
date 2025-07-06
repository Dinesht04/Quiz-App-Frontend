import { auth } from '@/lib/auth';
import { useGlobalContext } from './providers/GlobalContext';
import AuthGate from './components/auth/AuthGate';
import { redirect, RedirectType } from 'next/navigation';

export default async function () {
  const session = await auth();

  redirect('/home', RedirectType.push);

  return <AuthGate session={session} />;
}
