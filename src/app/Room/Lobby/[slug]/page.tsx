import RoomAuthGate from '@/app/components/auth/RoomAuthGate';
import { auth } from '@/lib/auth';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  //slug is RoomId
  const { slug } = await params;
  const session = await auth();
  return (
    <div>
      <RoomAuthGate roomid={slug} session={session} />
    </div>
  );
}
