'use client';

import DashboardBackgroundAnimation from './DashboardBackgroundAnimation';
import Statistics from './Statistics';
import Tutorial from './Tutorial';
import BattleStatistics from './BattleStatistics';
import JoinRoomCard, { NewJoinRoomCard } from './Cards/JoinRoom';
import { useGlobalContext } from '../providers/GlobalContext';

type DashboardProps = {
  session: any;
  isGuest: boolean;
};

export default function Dashboard({ session, isGuest }: DashboardProps) {
  const { username } = useGlobalContext();

  if (isGuest) {
    console.log('Guest is here');
  } else {
    console.log(session);
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Enhanced Cosmic Background */}
      <DashboardBackgroundAnimation />
      {/* Header */}
      <header className="relative z-10 border-b border-gray-800/50 backdrop-blur-sm bg-black/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Statistics session={session} />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Action Panel */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced Quick Actions */}
            {/* checking if guest user or not, if session exists then not. setting username accordingly. */}
            {session && session.data?.user?.name ? (
              <JoinRoomCard username={session.data?.user?.name} />
            ) : (
              <JoinRoomCard username={username} />
            )}

            {/* How It Works Tutorial */}
            <Tutorial />
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Enhanced User Stats */}
            <BattleStatistics />
            {/* Enhanced Trending Topics */}
            {/* <TrendingTopics/> */}
          </div>
        </div>
      </div>
    </div>
  );
}
