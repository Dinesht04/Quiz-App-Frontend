'use client';

import { useGlobalContext } from '@/app/providers/GlobalContext';
import { redirect } from 'next/navigation';
import Dashboard from '../../Dashboard/Dashboard';
import { useEffect } from 'react';
import { Session } from 'next-auth';

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8 animate-pulse">
      <div className="max-w-7xl mx-auto">
        {/* Top Nav Skeleton */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 bg-gray-700 rounded-full"></div>
            <div className="h-6 w-24 bg-gray-700 rounded-md"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-20 bg-gray-700 rounded-md"></div>
            <div className="h-8 w-32 bg-gray-700 rounded-md"></div>
          </div>
        </header>

        {/* Main Content Skeleton */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* How It Works Skeleton */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="h-7 w-1/3 bg-gray-700 rounded-md mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-24 bg-gray-700 rounded-lg"></div>
                <div className="h-24 bg-gray-700 rounded-lg"></div>
                <div className="h-24 bg-gray-700 rounded-lg"></div>
                <div className="h-24 bg-gray-700 rounded-lg"></div>
              </div>
            </div>

            {/* Battle Stats Skeleton */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="h-7 w-1/4 bg-gray-700 rounded-md mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="h-16 bg-gray-700 rounded-lg"></div>
                <div className="h-16 bg-gray-700 rounded-lg"></div>
                <div className="h-16 bg-gray-700 rounded-lg col-span-1 md:col-span-3"></div>
              </div>
            </div>
          </div>

          {/* Right Column Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 p-6 rounded-lg h-full flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 bg-green-500/50 rounded-lg mx-auto mb-4"></div>
                <div className="h-8 w-3/4 bg-gray-700 rounded-md mx-auto mb-3"></div>
                <div className="h-4 w-full bg-gray-700 rounded-md mb-1"></div>
                <div className="h-4 w-5/6 bg-gray-700 rounded-md mx-auto mb-8"></div>
              </div>
              <div>
                <div className="h-6 w-1/3 bg-gray-700 rounded-md mb-4"></div>
                <div className="h-12 w-full bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-2 w-12 bg-gray-700 rounded-md mx-auto mb-4"></div>
                <div className="h-12 w-full bg-green-500/50 rounded-lg"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function AuthGate({ session }: { session: Session | null }) {
  const { isGuest, cookie, loggedIn, loading } = useGlobalContext();

  useEffect(() => {
    if (!loading && !loggedIn) {
      redirect('/');
    }
  }, [loggedIn]);

  if (loading) {
    console.log("loading:",loading)
    console.log("loggedIn",loggedIn)
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
