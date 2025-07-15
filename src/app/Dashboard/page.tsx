import { auth } from '@/lib/auth';
import AuthGate from '../components/Auth/AuthGate';

export default async function Page() {
  const session = await auth();

  return (
    <div>
      <AuthGate session={session} />
    </div>
  );
}
