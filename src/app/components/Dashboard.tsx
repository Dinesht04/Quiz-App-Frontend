'use client';

import DashboardBackgroundAnimation from './DashboardBackgroundAnimation';
import Statistics from './Statistics';
import Tutorial from './Tutorial';
import BattleStatistics from './BattleStatistics';

import CosmicJoinRoom from './Cards/CosmicJoinRoom';
import { Session } from 'next-auth';

type DashboardProps = {
  session: Session | null;
  isGuest: boolean;
};

export default function Dashboard({ session, isGuest }: DashboardProps) {
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

            {/* How It Works Tutorial */}

            <Tutorial />
            <BattleStatistics />
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {!isGuest ? (
              <CosmicJoinRoom session={session} />
            ) : (
              <CosmicJoinRoom session={session} />
            )}
            {/* <TrendingTopics/> */}
          </div>
        </div>
      </div>
    </div>
  );
}
