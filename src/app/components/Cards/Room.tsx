"use client"

import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { useEffect, useRef,useState } from "react"
import MembersList from "./MembersList";
import { useSocket } from "@/app/providers/WebsocketContextProvider";
import ConnectionStatus from "../Websocket/ConnectionStatus";
import QuizStartTimer from "../Quiz/QuizStartTimer";
import { useQuizContext } from "@/app/providers/QuizContext";
import Quiz from "../Quiz/Quiz";

type Message = {
    type:string,
    payload: any,
    status:string
  }

type Props = {
    session: Session|null;
    roomid?:string
  };


export default function  ({roomid,session}: Props){

  if(!session){
    console.log("No Session")
    redirect("/")
  }

  const topicRef = useRef<HTMLInputElement>(null);
  const [clientList, setClientList] = useState<string[]>([]);
  const [displayQuizTImer,setDisplayQuizTimer] = useState(false);
  const {socket, isConnected} =  useSocket();
  const {joinedRoom,setJoinedRoom, setQuestions,setRoomId,quizStarted,setScore} = useQuizContext();
  
  
  console.log(session.user?.name)

  useEffect(() => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.log("🕓 socket not ready yet");
      return;
    }
  
    console.log("✅ Joining Room");
 
    
    socket.onmessage = (e) =>{
      const message : Message = JSON.parse(e.data)
      if(message.type === "client-list"){
        setJoinedRoom(true);
        setRoomId(roomid)
        setClientList(message.payload)
      }
      if(message.type === "questions"){
        setQuestions(message.payload);
        setDisplayQuizTimer(true);
      }
      if(message.type === "unauthorised"){
        alert(message.payload.message)
      }
      if(message.type === "leave"){
        if(message.status === "successful"){
          setClientList([]);
          setRoomId("");
          setJoinedRoom(false);
        }
      }
      if(message.type === "answer"){
        if(message.payload.Correct){
          console.log("correct answer")
          setScore((score)=>score+1);
        }
      }
      if(message.type === "score"){
        
          console.log("Quiz Finished")
          console.log(message.payload)
      }
    }
  
  }, [socket]);
  


function joinRoom(){
  if (socket && socket.readyState === WebSocket.OPEN){
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

function sendMessage(){
    if (socket && socket.readyState === WebSocket.OPEN) {
  
      const payload = {
        type: "message",
        payload: {
          roomId: roomid, 
          userName: session?.user?.name,
          message: "hi",
          expires:session?.expires
        },
      };
      socket.send(JSON.stringify(payload));
    } else {
      console.warn("WebSocket not open or inputs are not ready.");
      alert("Not connected to the server. Please wait or refresh.");
    }
  };  


    function LeaveRoom(){
        if (socket && socket.readyState === WebSocket.OPEN) {
          const payload = {
            type: "leave",
            payload: {
              roomId: roomid, 
              userName: session?.user?.name,
              expires:session?.expires
            },
            
          };
          socket.send(JSON.stringify(payload));
        } else {
          console.warn("WebSocket not open or username input is not ready.");
          alert("Not connected to the server. Please wait or refresh.");
        }
      }
  

      function startQuiz(){

        // if(!topicRef.current?.value){
        //     alert("Enter a TOpic FIrst")
        //     return
        // }

        if (socket && socket.readyState === WebSocket.OPEN) {
          const payload = {
            type: "start",
            payload: {
              roomId: roomid, 
          userName: session?.user?.name,
              expires:session?.expires,
              topic:"Web Development"
            },
            
          };
          socket.send(JSON.stringify(payload));
        } else {
          console.warn("WebSocket not open or username input is not ready.");
          alert("Not connected to the server. Please wait or refresh.");
        }
      }
    
    if(quizStarted){
      return <Quiz/>
    }

    if (displayQuizTImer){
      return <QuizStartTimer/>
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                        Room ID: {roomid}
                    </span>
                </h1>
                {!joinedRoom ? <button
                      onClick={joinRoom}
                      className={`px-6 py-3 rounded-lg font-semibold shadow-md transition duration-300 ease-in-out
                          ${isConnected ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500' :
                             'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                      disabled={!isConnected}
                  >
                      Join room
                  </button> 
                  : <button
                  onClick={LeaveRoom}
                  className={`px-6 py-3 rounded-lg font-semibold shadow-md transition duration-300 ease-in-out
                      ${isConnected ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500' :
                         'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                  disabled={!isConnected}
              >
                  Leave room
              </button>
            
                }
                {/* <input type="text" className="border border-black" ref={roomIdRef} placeholder="ENter room id here" />
                <input type="text" className="border border-black" ref={usernameRef} placeholder="ENter Username" /> */}

                {/* Connection Status */}
                <ConnectionStatus/>
                {/* <div className={`text-center py-2 px-4 rounded-md mb-4 text-sm font-semibold
                    ${isConnected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                     Backend Service Status: {isConnected ? 'Connected' : 'Disconnected'}
                </div>
                <input type="text" className="border border-black" ref={topicRef} placeholder="ENter \Topic" /> */}

                {/* Message Input and Send Button */}
                <div className="flex justify-center space-x-3">
                   
                      <button
                      // onClick={joinRoomd}
                      className={`px-6 py-3 rounded-lg font-semibold shadow-md transition duration-300 ease-in-out
                          ${isConnected ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500' :
                             'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                      disabled={!isConnected}
                  >
                      Re-JOin room
                  </button>
                   
                    <button
                        onClick={LeaveRoom}
                        className={`px-6 py-3 rounded-lg font-semibold shadow-md transition duration-300 ease-in-out
                            ${isConnected ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500' :
                               'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                        disabled={!isConnected}
                    >
                        LEave Room
                    </button>
                    <button
                        onClick={startQuiz}
                        className={`px-6 py-3 rounded-lg font-semibold shadow-md transition duration-300 ease-in-out
                            ${isConnected ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500' :
                               'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                        disabled={!isConnected}
                    >
                        Start Quiz
                    </button>
                </div>
                <MembersList clientList={clientList} />
            </div>
        </div>

    );
}