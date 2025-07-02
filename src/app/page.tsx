import { auth } from '@/lib/auth';
import { useGlobalContext } from './providers/GlobalContext';
import AuthGate from './components/auth/AuthGate';

export default async function () {
  const session = await auth();

  return <AuthGate session={session} />;
}
