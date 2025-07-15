import { auth } from '@/lib/auth';
import AuthGate from '../components/auth/AuthGate';

export default async function Page() {
  const session = await auth();

  return (
    <div>
      <AuthGate session={session} />
    </div>
  );
}
