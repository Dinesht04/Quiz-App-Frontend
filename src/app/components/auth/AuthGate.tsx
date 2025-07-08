'use client';

import SignInCard from './SignInCard';
import { Button } from '@/components/ui/button';
import { Clock, Play, Users, Zap } from 'lucide-react';
import JoinRoomCard from '../Cards/JoinRoom';
import { SignOut } from './AuthFunctions';
import { useGlobalContext } from '@/app/providers/GlobalContext';
import GuestComponent from '../GuestComponent';
import { redirect } from 'next/navigation';
import Dashboard from '../Dashboard';

export default function AuthGate({ session }: { session: any }) {
  const { isGuest } = useGlobalContext();

  if ((!session || !session.user || !session.user.name) && !isGuest) {
    redirect('/');
  }


  return (
    <Dashboard
      session={session}
      isGuest={true}
    />
  );
}
