"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@radix-ui/react-scroll-area";

import {
  Users,
  Play,
  LogOut,
  UserPlus,
  Wifi,
  WifiOff,
  Trophy,
  RefreshCcw,
  MessageCircle,
  BookOpen,
  Send,
} from "lucide-react";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import MembersList from "./MembersList";
import { useSocket } from "@/app/providers/WebsocketContextProvider";
import ConnectionStatus from "../Websocket/ConnectionStatus";
import QuizStartTimer from "../Quiz/QuizStartTimer";
import { useQuizContext } from "@/app/providers/QuizContext";
import Quiz from "../Quiz/Quiz";
import { toast } from "sonner";
import ChatCard from "./ChatCard";



export type Message = {
  type: string;
  payload: any;
  status: string;
  host?:boolean;
};

type Props = {
  session: Session | null;
  roomid?: string;
};

const difficultyNames = [
  "Kiddie Pool", // 1
  "Warm-up", // 2
  "Getting Spicy", // 3
  "Brain Melter", // 4
  "Impossible Mode" // 5
];

const difficultyColors = [
  "text-green-500",    // 1 - Easy
  "text-lime-500",     // 2
  "text-yellow-500",   // 3
  "text-orange-500",   // 4
  "text-red-600"       // 5 - Hard
];


const sliderDifficultyColors = [
  "bg-green-500",    // 1 - Easy
  "bg-lime-500",     // 2
  "bg-yellow-500",   // 3
  "bg-orange-500",   // 4
  "bg-red-600"       // 5 - Hard
];

export default function ({ roomid, session }: Props) {
  if (!session) {
    console.log("No Session");
    redirect("/");
  }

  const topicRef = useRef<HTMLInputElement>(null);
  const [difficulty,setDifficulty] = useState<number>(2)

  const [clientList, setClientList] = useState<string[]>([]);
  const [displayQuizTImer, setDisplayQuizTimer] = useState(false);
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
    setChatMessages
  } = useQuizContext();


  useEffect(() => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.log("🕓 socket not ready yet");
      return;
    }


    socket.onmessage = (e) => {
      const message: Message = JSON.parse(e.data);
      console.log("Checking for message type in Lobby")
      console.log(message)
      if(message.type === "join"){
        if(message.status === "successful"){
          toast(`✅ Joined Room ${roomid} Successfully`, {
            position:"top-right",
            richColors:true,
            description: new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit', hour: 'numeric', minute: '2-digit', hour12: true }).replace(',', '').replace(',', ' at'),
          })
          setJoinedRoom(true);
          setRoomId(roomid);
          if(message.host === true){
            setIsHost(true);
          }
        }
      }
      if (message.type === "client-list") {
        toast(`Lobby List Updated!`, {
          position:"top-right",
          richColors:true,
          description: new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit', hour: 'numeric', minute: '2-digit', hour12: true }).replace(',', '').replace(',', ' at'),
        })
        setClientList(message.payload);
      }
      if (message.type === "questions") {
        setQuestions(message.payload);
        setDisplayQuizTimer(true);
      }
      if (message.type === "unauthorised") {
        alert(message.payload.message);
      }
      if (message.type === "leave") {
        if (message.status === "successful") {
          toast(`Left Room ${roomid} successfully`, {
            position:"top-right",
            richColors:true,
            description: new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit', hour: 'numeric', minute: '2-digit', hour12: true }).replace(',', '').replace(',', ' at'),
            action: {
              label: "Re-Join",
              onClick: () => joinRoom(),
          }})
          setClientList([]);
          setRoomId("");
          setJoinedRoom(false);
        }
      }
      //SHould move answer and score to somewhere else
      if (message.type === "answer") {
        if (message.payload.Correct) {
          console.log("correct answer");
          setScore((score) => score + 1);
        }
      }
      if (message.type === "score") {
        console.log("Quiz Finished");
        console.log(message.payload);
      }
      if(message.type === "message"){
        console.log(message.payload)
        const newMessage = {
          username:message.payload.username,
          message:message.payload.message,
          time:message.payload.time
        }

         setChatMessages((messages)=>[...messages,newMessage])
      }

    };
  }, [socket]);

  function joinRoom() {
    if (joinedRoom) {
      toast(`Already in the Room!`, {
        position:"top-right",
        richColors:true,
      })
      return;
    }

    if (socket && socket.readyState === WebSocket.OPEN) {
      const joinPayload = {
        type: "join",
        payload: {
          roomId: roomid,
          username: session?.user?.name,
          expires: session?.expires,
        },
      };

      socket.send(JSON.stringify(joinPayload));
    }
  }

  function sendMessage() {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const payload = {
        type: "message",
        payload: {
          roomId: roomid,
          userName: session?.user?.name,
          message: "hi",
          expires: session?.expires,
        },
      };
      socket.send(JSON.stringify(payload));
    } else {
      console.warn("WebSocket not open or inputs are not ready.");
      alert("Not connected to the server. Please wait or refresh.");
    }
  }

  function LeaveRoom() {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const payload = {
        type: "leave",
        payload: {
          roomId: roomid,
          userName: session?.user?.name,
          expires: session?.expires,
        },
      };
      socket.send(JSON.stringify(payload));
    } else {
      console.warn("WebSocket not open or username input is not ready.");
      alert("Not connected to the server. Please wait or refresh.");
    }
  }

  function startQuiz() {

    if(!isHost){
      toast(`Only the Host can start the Game!`, {
        position:"top-right",
        richColors:true,
      })
      return;
    }

    if(!topicRef.current?.value){
      toast(`Enter a Topic First`, {
        position:"top-right",
        richColors:true,
      })        
      return;
    }

    if (socket && socket.readyState === WebSocket.OPEN) {
      const payload = {
        type: "start",
        payload: {
          roomId: roomid,
          userName: session?.user?.name,
          expires: session?.expires,
          topic: topicRef.current.value,
          difficulty: difficulty
        },
      };
      socket.send(JSON.stringify(payload));
    } else {
      console.warn("WebSocket not open or username input is not ready.");
      alert("Not connected to the server. Please wait or refresh.");
    }
  }

  if (quizStarted) {
    return <Quiz />;
  }

  if (displayQuizTImer) {
    return <QuizStartTimer />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8">
      <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm shadow-2xl border border-white/20 rounded-3xl overflow-hidden">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Room: {roomid}
          </CardTitle>
          <CardDescription className="text-gray-600 text-lg">
            {joinedRoom
              ? clientList.length == 1
                ? "You're in the room! Waiting for other players..."
                : "You're in the room! Waiting host to start the game..."
              : "Ready to join the quiz room?"}
          </CardDescription>

          {/* Connection Status */}
          <div className="flex items-center justify-center space-x-2">
            {isConnected ? (
              <>
                <Wifi className="w-5 h-5 text-green-500" />
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700 border-green-200"
                >
                  Connected
                </Badge>
              </>
            ) : (
              <>
                <WifiOff className="w-5 h-5 text-red-500" />
                <Badge
                  variant="secondary"
                  className="bg-red-100 text-red-700 border-red-200"
                >
                  Disconnected
                </Badge>
                <Badge
                  onClick={() => {
                    window.location.reload();
                  }}
                  variant="destructive"
                  className="bg-red-100 text-red-700 border-red-200 shadow-lg hover:shadow-xl hover:cursor-pointer transform hover:scale-105 transition-all duration-300 "
                >
                  Refresh
                  <RefreshCcw className="w-5 h-5 text-green-800" />
                </Badge>
              </>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6 px-8">

          {joinedRoom ? isHost ? (
            <div className="space-y-4">
            {/* Topic and Difficulty Section */}
            <div className="space-y-2">
              <Label htmlFor="topic" className="text-sm font-semibold text-gray-700 flex items-center">
                <BookOpen className="w-4 h-4 mr-2 text-purple-500" />
                Quiz Topic
              </Label>
              <Input
                id="topic"
                ref={topicRef}
                placeholder="Enter your niche quiz topic (e.g., Japanese Motorsport History, 9/11, Anant Ambani...)"
                className="h-12 rounded-full border-2 border-purple-200 focus:border-purple-400 bg-white/70"
              />
            </div>
            
            <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700">
              Difficulty Level:
              
            </Label>

              <div className="px-3">
                <Slider
                  // value={[difficulty]}
                  onValueChange={(value) => {
                    value[0] > 0 && value[0] < 20 ? setDifficulty(1) :
                    value[0] >= 20 && value[0] < 40 ? setDifficulty(2) :
                    value[0] >= 40 && value[0] < 60 ? setDifficulty(3) :
                    value[0] >= 60 && value[0] < 80 ? setDifficulty(4) :
                    setDifficulty(5)
                  }
                  }
                  defaultValue={[40]}
                  max={100}
                  min={1}
                  step={1}
                  className={`w-full `}
                  sliderColor={sliderDifficultyColors[difficulty - 1]}
                />

                <div className="flex justify-center text-md text-gray-500 mt-2">
                {difficulty > 0 && (
                <span className={`ml-2 font-bold ${difficultyColors[difficulty - 1]}`}>
                  {difficultyNames[difficulty - 1]}
                </span>
              )}
                </div>
              </div>
            </div>
          </div>
          ) : 
            <div>
              The Host is choosing the Topic and Difficulty, Kindly remain Patient.
            </div>
           : 
          <div>
            Join the Room!
          </div>
      }
  
          

          {/* Main Action Button */}
          {!joinedRoom ? (
            <Button
              onClick={joinRoom}
              disabled={!isConnected}
              size="lg"
              className="w-full h-14 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold text-lg"
            >
              <UserPlus className="w-6 h-6 mr-3" />
              Join Room
            </Button>
          ) : (
            <Button
              onClick={LeaveRoom}
              disabled={!isConnected}
              size="lg"
              className="w-full h-14 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold text-lg"
            >
              <LogOut className="w-6 h-6 mr-3" />
              Leave Room
            </Button>
          )}

          {/* Secondary Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={joinRoom}
              disabled={!isConnected}
              variant="outline"
              size="lg"
              className="h-12 border-2 border-blue-300 hover:border-blue-500 hover:bg-blue-50 text-blue-600 hover:text-blue-700 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Rejoin
            </Button>

            <Button
              onClick={startQuiz}
              disabled={!isConnected || !joinedRoom}
              size="lg"
              className="h-12 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
            >
              <Trophy className="w-5 h-5 mr-2" />
              Start Quiz
            </Button>
          </div>

          {/* Members List */}
          {clientList && clientList.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-500" />
                Players in Room ({clientList.length})
              </h3>
              <div className="bg-gray-50 rounded-2xl p-4 space-y-2 max-h-40 overflow-y-auto">
                {clientList.map((client, index) => (
                  <div
                    key={`${client}-${index}`}
                    className="flex items-center space-x-3 p-2 bg-white rounded-lg shadow-sm"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {client}
                    </div>
                    <span className="text-gray-700 font-medium">{client}</span>
                    {index === 0 && (
                      <Badge
                        variant="secondary"
                        className="bg-yellow-100 text-yellow-700 border-yellow-200 text-xs"
                      >
                        Host
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>

        {/* Floating Elements */}
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </Card>
      {joinedRoom && (
              <ChatCard roomid={roomid} session={session} />

      )}

          </div>
  );
}
