import { auth } from "@/lib/auth"
import Room from "../components/Cards/Room";

// To Do
// Room create/join , lobby and game Component.
// Lobby separate for host and user
// Host Logic,
// Game Data-Flow
//   Checking Answers, recording game data

// Need a way to store and send to backend if the user is host or not



export default async function(){

  const session = await auth();

  return(
    <div>
      <Room session={session} />
    </div>
  )
 
}