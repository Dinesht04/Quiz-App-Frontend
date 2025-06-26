// components/JoinRoomCard.tsx
"use client"

import {JSX, useEffect, useRef} from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Button } from "@/components/ui/button"; // Assuming you have a Button component
  import { redirect } from 'next/navigation';
import { useGlobalContext } from '@/app/providers/GlobalContext';

  type JoinRoomCardProps = {
    username:string;
    expires:string;
  }

  export default function JoinRoomCard({username,expires}:JoinRoomCardProps): JSX.Element {

    
    const roomIdRef = useRef<HTMLInputElement>(null) 

    const handleJoinRoom = (): void => {
      if(!roomIdRef.current?.value){
        alert("Enter a username first")
        return
      }
     redirect(`Room/Lobby/${roomIdRef.current?.value}`)
    };

    const handleCreateRoom = (): void =>{
      //GENERATE A ROOM ID
      let r = (Math.random() + 1).toString(36).substring(7);
      redirect(`/Room/Lobby/${r}`);
    }
  
    return (
      <div className="flex justify-center items-center">
        <Card className="w-[300px] text-center">
          <CardHeader>
            <CardTitle>Ready to Join?</CardTitle>
            <CardDescription>Click below to enter the quiz room.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Get ready for the game!
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 justify-center">
            <div className='flex max-w-[300px]'>
            <Button onClick={handleJoinRoom} className="">
              Join Room
            </Button>
            <input className='borde' type="text" name="Room Id" ref={roomIdRef} placeholder='Enter Room ID here' id="" />
            </div>
            
            <Button onClick={handleCreateRoom} className="w-full">
              Create Room
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }