'use client';

import SignInCard from './SignInCard';
import { Button } from '@/components/ui/button';
import { Clock, Play, Users, Zap } from 'lucide-react';
import JoinRoomCard from '../Cards/JoinRoom';
import { SignOut } from './AuthFunctions';
import { useGlobalContext } from '@/app/providers/GlobalContext';
import GuestComponent from '../GuestComponent';
import Room from '../Cards/Room';

export default function RoomAuthGate({
  session,
  roomid,
}: {
  session: any;
  roomid: string;
}) {
  const { isGuest, username, expires } = useGlobalContext();

  if ((!session || !session.user || !session.user.name) && !isGuest) {
    return <SignInCard />;
  }

  if (isGuest) {
    session = {
      user: {
        name: username,
      },
      expires: expires,
    };
    return <Room session={session} roomid={roomid} />;
  }

  return <Room session={session} roomid={roomid} />;
}
