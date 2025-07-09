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
import { useEffect } from 'react';

export default function AuthGate({ session }: { session: any }) {
  const { isGuest, cookie, loggedIn } = useGlobalContext();

  useEffect(() => {
    if (!loggedIn) {
      redirect('/');
    }
  }, [loggedIn]);

  // user signed in with google
  if (cookie && !isGuest) {
    // we will pass session
    return <Dashboard session={session} isGuest={false} />;
  }

  // continue as guest
  else {
    // use username from global context

    return <Dashboard session={null} isGuest={false} />;
  }

  // if ((!session || !session.user || !session.user.name) && !isGuest) {
  //   redirect('/');
  // }
}
