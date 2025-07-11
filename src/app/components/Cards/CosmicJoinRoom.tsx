import { useGlobalContext } from '@/app/providers/GlobalContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Play, Plus, Users } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useRef, useState } from 'react';
import JoinRoomCard from './JoinRoom';
import { LoadingButton } from '@/components/ui/LoadingButton';

type CosmicRoomCardProps = {
  expires?: string;
  SignOut?: React.JSX.Element;
  session: any;
};

export default function CosmicJoinRoom({ session }: CosmicRoomCardProps) {
  const { setUsername, isGuest, username } = useGlobalContext();
  const [joinLoading, setJoinLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  const roomIdRef = useRef<HTMLInputElement>(null);

  const handleJoinRoom = (): void => {
    if (!roomIdRef.current?.value) {
      alert('Enter a Room ID first');
      return;
    }
    setJoinLoading(true);
    if (session) {
      setUsername(session?.user?.name);
    }
    redirect(`Room/Lobby/${roomIdRef.current?.value}`);
  };

  const handleCreateRoom = (): void => {
    setCreateLoading(true);
    // Generating a random a room ID

    let r = (Math.random() + 1).toString(36).substring(7);
    if (session) {
      setUsername(session?.user?.name);
    }
    redirect(`/Room/Lobby/${r}`);
  };

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#A9F99E] via-cyan-400 to-purple-500 rounded-2xl blur-sm opacity-30 animate-pulse"></div>

      <Card className="relative bg-black/90 border-0 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">
        {/* Animated border */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#A9F99E] via-cyan-400 to-purple-500 rounded-2xl p-[2px]">
          <div className="bg-black/95 rounded-2xl h-full w-full"></div>
        </div>

        {/* Inner cosmic effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#A9F99E]/5 via-transparent to-purple-500/5"></div>
        <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-[#A9F99E]/10 to-transparent rounded-full blur-xl"></div>

        <div className="relative z-10">
          <CardHeader className="pb-6 pt-8">
            <div className="flex flex-col items-center space-y-4">
              {/* Cosmic Play Icon */}
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#A9F99E] to-cyan-400 rounded-full blur-md opacity-50 animate-pulse"></div>
                <div className="relative w-16 h-16 bg-gradient-to-br from-[#A9F99E] to-cyan-400 rounded-full flex items-center justify-center shadow-2xl shadow-[#A9F99E]/50">
                  <Play className="w-8 h-8 text-black ml-1" />
                  {/* Orbiting particles */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping"></div>
                  <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse delay-500"></div>
                </div>
              </div>

              <div className="text-center">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-[#A9F99E] via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  Ready to Play?
                </CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  Join an existing room or create your own
                  <br />
                  <span className="text-[#A9F99E] font-semibold">
                    quiz adventure
                  </span>
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <div className="space-y-6">
              {/* Join Existing Room Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                    <Users className="w-3 h-3 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg">
                    Join Existing Room
                  </h3>
                </div>

                <div className="flex space-x-3">
                  <div className="relative flex-1">
                    {/* Input with cosmic styling */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#A9F99E]/50 to-cyan-400/50 rounded-xl blur-sm opacity-30"></div>
                    <Input
                      placeholder="Enter Room ID"
                      ref={roomIdRef}
                      className="relative bg-gray-900/80 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-[#A9F99E] focus:ring-2 focus:ring-[#A9F99E]/30 h-12 text-base rounded-xl backdrop-blur-sm"
                    />
                    {/* Floating particles in input */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-2 h-2 bg-[#A9F99E] rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Cosmic Join Button */}
                  <div className="relative">
                    {joinLoading ? (
                      <LoadingButton />
                    ) : (
                      <>
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-sm opacity-50"></div>
                        <Button
                          onClick={handleJoinRoom}
                          className="relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white h-12 px-6 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                          <Users className="w-4 h-4 mr-2" />
                          Join
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Cosmic Divider */}
              <div className="relative flex items-center justify-center py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                </div>
                <div className="relative bg-black px-4">
                  <span className="text-gray-400 text-sm font-medium">or</span>
                </div>
              </div>

              {/* Create New Room Button */}
              <div className="relative">
                {createLoading ? (
                  <LoadingButton />
                ) : (
                  <>
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#A9F99E] via-cyan-400 to-[#A9F99E] rounded-xl blur-sm opacity-60 animate-pulse"></div>

                    <Button
                      onClick={handleCreateRoom}
                      className="relative w-full bg-gradient-to-r from-[#A9F99E] to-cyan-400 hover:from-[#A9F99E]/90 hover:to-cyan-400/90 text-black h-14 text-lg font-bold rounded-xl shadow-2xl shadow-[#A9F99E]/30 transition-all duration-300 transform hover:scale-105"
                    >
                      <Plus className="w-5 h-5 mr-3" />
                      Create New Room
                    </Button>
                  </>
                )}
              </div>

              {/* User Info Section */}
              <div className="pt-4 border-t border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">W</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Playing as:</p>
                      <p className="text-[#A9F99E] font-semibold">
                        {' '}
                        <span>{isGuest ? username : session?.user?.name} </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
