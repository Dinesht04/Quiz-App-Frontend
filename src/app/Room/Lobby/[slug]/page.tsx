
import Room from "@/app/components/Cards/Room"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  //slug is RoomId
  const { slug } = await params;
  const session = await auth();

  if (!session || !session.user || !session.user.name) {
    redirect('/');
  }

  return (
    <div>
      <Room roomid={slug} session={session} />
    </div>
  );
}
