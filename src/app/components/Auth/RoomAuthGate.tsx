'use client';


import { useGlobalContext } from '@/app/providers/GlobalContext';

import Room from '../Cards/Room';
import { Session } from 'next-auth';
import { useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';


function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8 animate-pulse">
      
    </div>
  );
}

export default function RoomAuthGate({
  session,
  roomid,
}: {
  session: Session | null;
  roomid: string;
}) {
  const { isGuest, username, expires,loading,loggedIn,cookie } = useGlobalContext();
  const router = useRouter();


  useEffect(() => {
    if (!loading && !loggedIn) {
      redirect('/');
    }
  }, [loggedIn]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if ((!session || !session.user || !session.user.name) && !isGuest) {
    router.replace('/')
    }

     if (loggedIn) {
        if (cookie && !isGuest) {
          return <Room session={session} roomid={roomid} />;
        } else {
          session = {
            user: {
              name: username,
            },
            expires: expires,
          };
          return <Room session={session} roomid={roomid} />;
        }
      }
    
      return <LoadingSpinner />;

  }
