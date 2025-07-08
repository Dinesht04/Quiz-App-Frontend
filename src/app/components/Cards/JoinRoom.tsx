// components/JoinRoomCard.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Plus, Play, Zap, Rocket, Sparkles } from 'lucide-react';
import { redirect } from 'next/navigation';
import { SignOut } from '../auth/AuthFunctions';
import { useGlobalContext } from '@/app/providers/GlobalContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

type JoinRoomCardProps = {
  username: string;
  expires?: string;
  SignOut?: React.JSX.Element;
};

export default function JoinRoomCard({
  username,
  expires,
  SignOut,
}: JoinRoomCardProps) {
  const { setUsername } = useGlobalContext();

  const roomIdRef = useRef<HTMLInputElement>(null);

  const handleJoinRoom = (): void => {
    if (!roomIdRef.current?.value) {
      alert('Enter a Room ID first');
      return;
    }
    setUsername(username);
    redirect(`Room/Lobby/${roomIdRef.current?.value}`);
  };

  const handleCreateRoom = (): void => {
    // Generating a random a room ID
    let r = (Math.random() + 1).toString(36).substring(7);
    setUsername(username);
    redirect(`/Room/Lobby/${r}`);
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-2xl border border-white/20 rounded-3xl overflow-hidden">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Play className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Ready to Play?
          </CardTitle>
          <CardDescription className="text-gray-600 text-lg">
            Join an existing room or create your own quiz adventure
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 px-8">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 block">
              Join Existing Room
            </label>
            <div className="flex space-x-3">
              <Input
                ref={roomIdRef}
                type="text"
                placeholder="Enter Room ID"
                className="flex-1 h-12 rounded-full border-2 border-gray-200 px-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
              />
              <Button
                onClick={handleJoinRoom}
                size="lg"
                className="h-12 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Users className="w-5 h-5 mr-2" />
                Join
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-8 pb-4">
          <Button
            onClick={handleCreateRoom}
            size="lg"
            className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Room
          </Button>
        </CardFooter>

        {username && (
          <div className="px-8 pb-2">
            <div className="text-center text-sm text-gray-500">
              Playing as:{' '}
              <span className="font-medium text-blue-600">{username}</span>
              {/* {SignOut && <span className="mt-2">{SignOut}</span>} */}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}


export function NewJoinRoomCard({
  username,
  expires,
  SignOut,
}: JoinRoomCardProps){

  const [pulseAnimation, setPulseAnimation] = useState(false)
  const { setUsername } = useGlobalContext();

  const roomIdRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
      const interval = setInterval(() => {
        setPulseAnimation(true)
        setTimeout(() => setPulseAnimation(false), 1000)
      }, 3000)
      return () => clearInterval(interval)
    }, [])

  const handleJoinRoom = (): void => {
    if (!roomIdRef.current?.value) {
      alert('Enter a Room ID first');
      return;
    }
    setUsername(username);
    redirect(`Room/Lobby/${roomIdRef.current?.value}`);
  };

  const handleCreateRoom = (): void => {
    // Generating a random a room ID
    let r = (Math.random() + 1).toString(36).substring(7);
    setUsername(username);
    redirect(`/Room/Lobby/${r}`);
  };

  return(
    <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700/50 backdrop-blur-sm shadow-2xl shadow-[#A9F99E]/10">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 bg-gradient-to-br from-[#A9F99E] to-cyan-400 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${pulseAnimation ? "scale-110 shadow-[#A9F99E]/50" : "shadow-[#A9F99E]/25"}`}
                  >
                    <Play className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white">Ready to Dominate?</CardTitle>
                    <CardDescription className="text-gray-400">Choose your battle mode</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="join" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 p-1 rounded-xl">
                    <TabsTrigger
                      value="join"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#A9F99E] data-[state=active]:to-cyan-400 data-[state=active]:text-black rounded-lg transition-all duration-300"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Join Battle
                    </TabsTrigger>
                    <TabsTrigger
                      value="create"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#A9F99E] data-[state=active]:to-cyan-400 data-[state=active]:text-black rounded-lg transition-all duration-300"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Arena
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="join" className="space-y-6 mt-8">
                    <div className="flex space-x-3">
                      <div className="relative flex-1">
                        <Input
                          placeholder="Enter Room Code..."
                          ref={roomIdRef}
                          className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-[#A9F99E] focus:ring-2 focus:ring-[#A9F99E]/20 h-12 text-lg rounded-xl"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <Zap className="w-5 h-5 text-[#A9F99E]" />
                        </div>
                      </div>
                      <Button
                      onClick={handleJoinRoom}
                      className="bg-gradient-to-r from-[#A9F99E] to-cyan-400 text-black hover:from-[#A9F99E]/90 hover:to-cyan-400/90 h-12 px-8 rounded-xl font-semibold shadow-lg hover:shadow-[#A9F99E]/25 transition-all duration-300">
                        <Rocket className="w-4 h-4 mr-2" />
                        Launch!
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="create" className="space-y-6 mt-8">
                    <Button
                    onClick={handleCreateRoom}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 h-16 text-xl font-bold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                      <Plus className="w-6 h-6 mr-3" />
                      Create New Arena
                      <Sparkles
                       className="w-5 h-5 ml-3" />
                    </Button>
                    <p className="text-center text-gray-400 text-sm">Topic & difficulty selection in lobby</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

  )
}
