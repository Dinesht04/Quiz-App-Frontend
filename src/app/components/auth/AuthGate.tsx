'use client';

import { useGlobalContext } from '@/app/providers/GlobalContext';
import { redirect } from 'next/navigation';
import Dashboard from '../Dashboard';
import { useEffect } from 'react';

function LoadingSpinner() {
  return <div>Loading...</div>;
}

export default function AuthGate({ session }: { session: any }) {
  const { isGuest, cookie, loggedIn, loading } = useGlobalContext();

  useEffect(() => {
    if (!loading && !loggedIn) {
      redirect('/');
    }
  }, [loggedIn]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (loggedIn) {
    if (cookie && !isGuest) {
      return <Dashboard session={session} isGuest={false} />;
    } else {
      return <Dashboard session={null} isGuest={true} />;
    }
  }

  return <LoadingSpinner />;
}
