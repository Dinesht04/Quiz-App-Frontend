import RoomAuthGate from '@/app/components/auth/RoomAuthGate';
import Room from '@/app/components/Cards/Room';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
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
