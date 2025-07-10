import { auth } from '@/lib/auth';
import AuthGate from '../components/auth/AuthGate';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth();

  return (
    <div>
      <AuthGate session={session} />
    </div>
  );
}
