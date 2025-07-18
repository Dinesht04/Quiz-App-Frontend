'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Users,
  LogOut,
  UserPlus,
  Wifi,
  WifiOff,
  Trophy,
  RefreshCcw,
  BookOpen,
  MoveLeft,
} from 'lucide-react';
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { useSocket } from '@/app/providers/WebsocketContextProvider';

import QuizStartTimer from '../Quiz/QuizStartTimer';
import { useQuizContext } from '@/app/providers/QuizContext';
import Quiz from '../Quiz/Quiz';
import { toast } from 'sonner';
import ChatCard from './ChatCard';
import { LoadingButton } from '@/components/ui/LoadingButton';
import { CopyButton } from '@/components/CopyButton';
import { useGlobalContext } from '@/app/providers/GlobalContext';
import RoomMembers from './RoomMembers';

export type Message = {
  type: string;
  // eslint-disable-next-line
  payload: any;
  status: string;
  host?: boolean;
};

type Props = {
  session: Session | null;
  roomid?: string;
}


const difficultyNames = [
  'Kiddie Pool', // 1
  'Warm-up', // 2
  'Getting Spicy', // 3
  'Brain Melter', // 4
  'Impossible Mode', // 5
];

const difficultyColors = [
  'text-green-500', // 1 - Easy
  'text-lime-500', // 2
  'text-yellow-500', // 3
  'text-orange-500', // 4
  'text-red-600', // 5 - Hard
];

const sliderDifficultyColors = [
  'bg-green-500', // 1 - Easy
  'bg-lime-500', // 2
  'bg-yellow-500', // 3
  'bg-orange-500', // 4
  'bg-red-600', // 5 - Hard
];

export default function Room({ roomid, session }: Props) {
  if (!session) {
    redirect('/Dashboard');
  }

  const topicRef = useRef<HTMLInputElement>(null);
  const [difficulty, setDifficulty] = useState<number>(2);
  const [loading, setLoading] = useState(false);
  const [clientList, setClientList] = useState<string[]>([]);
  const [displayQuizTImer, setDisplayQuizTimer] = useState(false);
  const { username } = useGlobalContext();
  const { socket, isConnected } = useSocket();
  const {
    joinedRoom,
    setJoinedRoom,
    setQuestions,
    setRoomId,
    quizStarted,
    setScore,
    setIsHost,
    isHost,
    setChatMessages,
    setFinalScore,
    setQuizFinished,
    setLiveScore,

  } = useQuizContext();

  useEffect(() => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.log('🕓 socket not ready yet');
      return;
    }

    socket.onmessage = (e) => {
      const message: Message = JSON.parse(e.data);
      if (message.type === 'join') {
        if (message.status === 'successful') {
          toast.success(`Joined Room ${roomid} Successfully`, {
            position: 'top-right',
            richColors: true,
            description: new Date()
              .toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: '2-digit',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })
              .replace(',', '')
              .replace(',', ' at'),
          });
          setJoinedRoom(true);
          setRoomId(roomid);
          if (message.host === true) {
            setIsHost(true);
          }
        } else {
          toast.error(`Sorry! Couldn't join Room ${roomid} Successfully!`, {
            position: 'top-right',
            richColors: true,
            description: new Date()
              .toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: '2-digit',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })
              .replace(',', '')
              .replace(',', ' at'),
          });
        }
      }
      if (message.type === 'client-list') {
        //Can I write logic such that it doesn't on initial render?
        if (clientList.length !== 0) {
          toast.info(`Lobby List Updated!`, {
            position: 'top-right',
            richColors: true,
            description: new Date()
              .toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: '2-digit',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })
              .replace(',', '')
              .replace(',', ' at'),
          });
        }
        setClientList(message.payload);
      }

      if (message.type === 'questions') {
        setQuestions(message.payload);
        setDisplayQuizTimer(true);
        setLoading(false);
      }
      if (message.type === 'unauthorised') {
        toast.error(`message.payload.message`, {
          position: 'top-right',
          richColors: true,
          description: new Date()
            .toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: '2-digit',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })
            .replace(',', '')
            .replace(',', ' at'),
        });
      }

      if (message.type === 'leave') {
        if (message.status === 'successful') {
          toast.success(`Left Room ${roomid} successfully`, {
            position: 'top-right',
            richColors: true,
            description: new Date()
              .toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: '2-digit',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })
              .replace(',', '')
              .replace(',', ' at'),
            action: {
              label: 'Re-Join',
              onClick: () => joinRoom(),
            },
          });
          setClientList([]);
          setRoomId('');
          setJoinedRoom(false);
        }
      }
      //SHould move answer and score to somewhere else
      if (message.type === 'answer') {
        if (message.payload.Correct) {
          //TO-DO Toast here?
          toast.success(`Correct Answer!!`, {
            position: 'top-right',
            richColors: true,
          });
          setScore((score) => score + 1);
        }
      }

      if (message.type === 'message') {
        const newMessage = {
          username: message.payload.username,
          message: message.payload.message,
          time: message.payload.time,
        };
        setChatMessages((messages) => [...messages, newMessage]);
      }

      if (message.type === 'live-score') {
        setLiveScore(message.payload.liveScore);
      }

      if (message.type === 'final-score') {
        setFinalScore(message.payload.finalScores);
        setQuizFinished(true);
        toast.info(`Quiz has Ended!`, {
          position: 'top-right',
          richColors: true,
          description: new Date()
            .toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: '2-digit',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })
            .replace(',', '')
            .replace(',', ' at'),
        });
      }
    };
    // eslint-disable-next-line
  }, [socket]);

  function joinRoom() {
    if (joinedRoom) {
      toast.warning(`Already in the Room!`, {
        position: 'top-right',
        richColors: true,
      });
      return;
    }

    if (socket && socket.readyState === WebSocket.OPEN) {
      const joinPayload = {
        type: 'join',
        payload: {
          roomId: roomid,
          username: session?.user?.name,
          expires: session?.expires,
        },
      };

      socket.send(JSON.stringify(joinPayload));
    }
  }

   function LeaveRoom() {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const payload = {
        type: 'leave',
        payload: {
          roomId: roomid,
          userName: session?.user?.name,
          expires: session?.expires,
        },
      };
      socket.send(JSON.stringify(payload));
    } else {
      console.warn('WebSocket not open or username input is not ready.');
      //alert('Not connected to the server. Please wait or refresh.');
      // ----------------------------
      toast.error(`Sorry! Couldn't join Room ${roomid} Successfully!`, {
        position: 'top-right',
        richColors: true,
        description: new Date()
          .toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })
          .replace(',', '')
          .replace(',', ' at'),
      });
    }
  }

  function startQuiz() {
    if (!isHost) {
      toast.warning(`Only the Host can start the Game!`, {
        position: 'top-right',
        richColors: true,
      });
      return;
    }

    if (!topicRef.current?.value) {
      toast.warning(`Enter a Topic First`, {
        position: 'top-right',
        richColors: true,
      });
      return;
    }

    if (socket && socket.readyState === WebSocket.OPEN) {
      const payload = {
        type: 'start',
        payload: {
          roomId: roomid,
          userName: session?.user?.name,
          expires: session?.expires,
          topic: topicRef.current.value,
          difficulty: difficulty,
        },
      };

      socket.send(JSON.stringify(payload));

      toast.info(`Request for questions Sent!, Please Wait`, {
        position: 'top-right',
        richColors: true,
        description: new Date()
          .toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })
          .replace(',', '')
          .replace(',', ' at'),
      });
      setLoading(true);
    } else {
      console.warn('WebSocket not open or username input is not ready.');
      toast.error(`Not connected to the server. Please wait or refresh.`, {
        position: 'top-right',
        richColors: true,
      });
    }
  }

  if (quizStarted) {
    return <Quiz />;
  }

  if (displayQuizTImer) {
    return <QuizStartTimer />;
  }

  return(
    <div className="min-h-screen bg-black relative overflow-hidden">
    {/* Cosmic Background */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

      {/* Floating elements - reduced on mobile */}
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#A9F99E] rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-20 sm:top-40 right-10 sm:right-20 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-cyan-400 rounded-full animate-pulse delay-1000 opacity-40"></div>
      <div className="absolute bottom-16 sm:bottom-32 left-1/4 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-purple-400 rounded-full animate-pulse delay-500 opacity-50"></div>
      <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-cyan-300 rounded-full animate-pulse delay-300 opacity-60"></div>

      {/* Orbs - smaller on mobile */}
      <div className="absolute top-1/4 left-1/3 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-r from-[#A9F99E]/10 to-cyan-400/10 rounded-full blur-2xl sm:blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-20 sm:w-40 h-20 sm:h-40 bg-gradient-to-r from-purple-500/8 to-pink-500/8 rounded-full blur-2xl sm:blur-3xl"></div>

      {/* Grid - adjusted for mobile */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(169,249,158,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(169,249,158,0.02)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px]"></div>
    </div>

    {/* Main Content */}
    <div className="relative z-10 min-h-screen flex flex-col lg:flex-row lg:justify-center lg:items-center p-4 lg:p-8 lg:space-x-8">
      {/* Main Card */}
      <div className="w-full lg:max-w-2xl xl:max-w-4xl mb-6 lg:mb-0">
        <div className="relative">
          {/* Outer glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#A9F99E]/20 via-cyan-400/20 to-purple-500/20 rounded-2xl sm:rounded-3xl blur-sm opacity-50"></div>

          <Card className="relative bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
            {/* Inner cosmic effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#A9F99E]/3 via-transparent to-purple-500/3"></div>
            <div className="absolute top-0 right-0 w-20 sm:w-40 h-20 sm:h-40 bg-gradient-to-br from-cyan-400/5 to-transparent rounded-full blur-xl sm:blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-br from-[#A9F99E]/5 to-transparent rounded-full blur-lg sm:blur-xl"></div>

            <div className="relative z-10">
              <CardHeader className="text-center space-y-4 sm:space-y-6 p-4 sm:p-8">
                {/* Back button */}
                <div className="flex items-center justify-start">
                  <Button
                    className="hover:bg-gray-800 hover:cursor-pointer"
                    onClick={() => {
                      LeaveRoom()
                      redirect("/Dashboard")
                    }}
                  >
                    <MoveLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>

                {/* Room icon */}
                <div className="relative mx-auto">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#A9F99E] to-cyan-400 rounded-full blur-md opacity-30"></div>
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#A9F99E] to-cyan-400 rounded-full flex items-center justify-center shadow-lg shadow-[#A9F99E]/25">
                    <Users className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                  </div>
                </div>

                {/* Title and description */}
                <div className="space-y-2 sm:space-y-3">
                  <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#A9F99E] via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Room: {roomid}
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed px-2">
                    {joinedRoom
                      ? clientList.length == 1
                        ? "You're in the room! Waiting for other players..."
                        : "You're in the room! Waiting host to start the game..."
                      : "Ready to join the quiz room?"}
                    <br />
                    <div className="mt-3 sm:mt-4">
                      <CopyButton
                        className="text-black hover:text-gray-600 hover:cursor-pointer text-xs sm:text-sm"
                        text={`${roomid}`}
                      />
                    </div>
                  </CardDescription>
                </div>

                {/* Connection Status */}
                <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                  {isConnected ? (
                    <div className="flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                      <Wifi className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                      <Badge
                        variant="secondary"
                        className="bg-green-500/20 text-green-300 border-green-500/30 text-xs sm:text-sm"
                      >
                        Connected
                      </Badge>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                      <div className="flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                        <WifiOff className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                        <Badge
                          variant="secondary"
                          className="bg-red-500/20 text-red-300 border-red-500/30 text-xs sm:text-sm"
                        >
                          Disconnected
                        </Badge>
                      </div>
                      <Badge
                        onClick={() => window.location.reload()}
                        variant="destructive"
                        className="bg-red-500/20 text-red-300 border-red-500/30 shadow-lg hover:shadow-xl hover:cursor-pointer transform hover:scale-105 transition-all duration-300 px-2 sm:px-3 py-1 text-xs sm:text-sm"
                      >
                        <RefreshCcw className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        Refresh
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>

              {isConnected && (
                <CardContent className="space-y-6 sm:space-y-8 p-4 sm:p-8">
                  {/* Content based on room state */}
                  {joinedRoom ? (
                    isHost ? (
                      <div className="space-y-4 sm:space-y-6">
                        {/* Topic Section */}
                        <div className="space-y-2 sm:space-y-3">
                          <Label
                            htmlFor="topic"
                            className="text-xs sm:text-sm font-semibold text-gray-300 flex items-center"
                          >
                            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-2">
                              <BookOpen className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                            </div>
                            Quiz Topic
                          </Label>
                          <div className="relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#A9F99E]/30 to-cyan-400/30 rounded-xl sm:rounded-2xl blur-sm opacity-30"></div>
                            <Input
                              id="topic"
                              ref={topicRef}
                              placeholder="Enter your niche quiz topic (e.g., Japanese Motorsport History, 9/11, Anant Ambani...)"
                              className="relative h-10 sm:h-12 rounded-xl sm:rounded-2xl border border-gray-600/50 bg-gray-800/50 text-white placeholder:text-gray-400 focus:border-[#A9F99E] focus:ring-2 focus:ring-[#A9F99E]/20 backdrop-blur-sm text-sm sm:text-base"
                            />
                          </div>
                        </div>

                        {/* Difficulty Section */}
                        <div className="space-y-3 sm:space-y-4">
                          <Label className="text-xs sm:text-sm font-semibold text-gray-300">Difficulty Level:</Label>
                          <div className="px-3 sm:px-4 py-3 sm:py-4 bg-gray-800/30 rounded-xl sm:rounded-2xl border border-gray-700/50">
                            <Slider
                                                          /* eslint-disable */

                              onValueChange={(value) => {
                                value[0] > 0 && value[0] < 20
                                  ? setDifficulty(1)
                                  : value[0] >= 20 && value[0] < 40
                                    ? setDifficulty(2)
                                    : value[0] >= 40 && value[0] < 60
                                      ? setDifficulty(3)
                                      : value[0] >= 60 && value[0] < 80
                                        ? setDifficulty(4)
                                        : setDifficulty(5)
                              }}
                                                            /* eslint-enable */

                              defaultValue={[40]}
                              max={100}
                              min={1}
                              step={1}
                              className="w-full"
                              // @ts-expect-error added externally
                                sliderColor={
                                  sliderDifficultyColors[difficulty - 1]
                                }
                            />
                            <div className="flex justify-center text-sm sm:text-lg text-gray-300 mt-2 sm:mt-3">
                              {difficulty > 0 && (
                                <span className={`font-bold ${difficultyColors[difficulty - 1]} mt-2`}>
                                  {difficultyNames[difficulty - 1]}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6 sm:py-8">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                          <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <p className="text-gray-300 text-sm sm:text-lg px-4">
                          The Host is choosing the Topic and Difficulty, Kindly remain Patient.
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="text-center py-6 sm:py-8">
                      <p className="text-gray-300 text-lg sm:text-xl font-medium">Join the Room!</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-3 sm:space-y-4">
                    {!joinedRoom ? (
                      <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#A9F99E] to-cyan-400 rounded-xl sm:rounded-2xl blur-sm opacity-50"></div>
                        <Button
                          onClick={joinRoom}
                          disabled={!isConnected}
                          size="lg"
                          className="relative w-full h-12 sm:h-14 bg-gradient-to-r from-[#A9F99E] to-cyan-400 hover:from-[#A9F99E]/90 hover:to-cyan-400/90 disabled:from-gray-600 disabled:to-gray-700 text-black font-semibold text-sm sm:text-lg rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                          <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                          Join Room
                        </Button>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/50 to-pink-500/50 rounded-xl sm:rounded-2xl blur-sm opacity-50"></div>
                        <Button
                          onClick={LeaveRoom}
                          disabled={!isConnected}
                          size="lg"
                          className="relative w-full h-12 sm:h-14 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold text-sm sm:text-lg rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                          <LogOut className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                          Leave Room
                        </Button>
                      </div>
                    )}

                    {/* Secondary Actions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <Button
                        onClick={joinRoom}
                        disabled={!isConnected}
                        variant="outline"
                        size="lg"
                        className="h-10 sm:h-12 border-2 border-gray-600/50 hover:border-[#A9F99E]/50 hover:bg-[#A9F99E]/10 text-gray-300 hover:text-[#A9F99E] rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium bg-gray-800/30 text-sm sm:text-base"
                      >
                        <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Rejoin
                      </Button>

                      {isHost && (
                        <div className="sm:col-span-1">
                          {loading ? (
                            <LoadingButton />
                          ) : (
                            <div className="relative">
                              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/50 to-indigo-500/50 rounded-xl sm:rounded-2xl blur-sm opacity-50"></div>
                              <Button
                                onClick={startQuiz}
                                disabled={!isConnected || !joinedRoom}
                                size="lg"
                                className="relative h-10 sm:h-12 w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold text-sm sm:text-base"
                              >
                                <Trophy className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                Start Quiz
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              )}
            </div>

            {/* Floating elements */}
            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-[#A9F99E]/30 to-cyan-500/30 rounded-full opacity-60 animate-pulse delay-1000"></div>
          </Card>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-80 xl:w-96 space-y-4 sm:space-y-6">
        {/* Room Members */}
        <RoomMembers clientList={clientList} username={username} />

        {/* Chat Card */}
        {joinedRoom && <ChatCard roomid={roomid} session={session} />}
      </div>
    </div>
  </div>
  );
}
