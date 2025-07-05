'use client';

import SignInCard from './SignInCard';
import { Button } from '@/components/ui/button';
import { Clock, Play, Users, Zap } from 'lucide-react';
import JoinRoomCard from '../Cards/JoinRoom';
import { SignOut } from './AuthFunctions';
import { useGlobalContext } from '@/app/providers/GlobalContext';
import GuestComponent from '../GuestComponent';

export default function AuthGate({ session }: { session: any }) {
  const { isGuest } = useGlobalContext();

  if ((!session || !session.user || !session.user.name) && !isGuest) {
    return <SignInCard />;
  }

  if (isGuest) {
    return <GuestComponent />;
  }

  return (
    <div className="flex justify-center items-center space-x-8 h-screen">
      <div className="space-y-8 text-center lg:text-left">
        <div className="space-y-4">
          <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
            Quiz
            <span className="block text-4xl lg:text-6xl">Together</span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-lg mx-auto lg:mx-0">
            Join the ultimate real-time quiz experience. Create rooms, challenge
            friends, and test your knowledge together on{' '}
            <span className="text-amber-700">ANY TOPIC</span> you want!
          </p>
        </div>

        <div className="space-y-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <Play className="w-6 h-6 mr-2" />
            Play Now
          </Button>

          <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Real-time</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Multiplayer</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Instant</span>
            </div>
          </div>
        </div>
      </div>

      <div id="roomCard" className="">
        {/* <h1>Hey {session?.user?.name}</h1> */}
        <JoinRoomCard
          username={session.user.name}
          SignOut={<SignOut />}
          expires={session.expires}
        />
        {/* <ConnectionStatus/> */}
      </div>
    </div>
  );
}
