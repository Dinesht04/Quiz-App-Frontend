import { auth } from "@/lib/auth";
import JoinRoomCard from "./components/Cards/JoinRoom";
import { SignIn, SignOut } from "./components/auth/AuthFunctions";
import { redirect } from "next/navigation";
import ConnectionStatus from "./components/Websocket/ConnectionStatus";

export default async function(){

    const session = await auth()

    if(!session || !session.user || !session.user.name){
        // redirect('/sign-in')
        return(
            <SignIn/>
        )
    }
    
    return(
        <div className="flex flex-col justify-center items-center h-screen">
            <div>
                <h1>Hey {session?.user?.name}</h1>
            </div>
            <JoinRoomCard username={session.user.name} expires={session.expires} />
            {/* <ConnectionStatus/> */}
            <SignOut/>
        </div>
    )
}

