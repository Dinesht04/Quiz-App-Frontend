"use client"

import { useSocket } from "../../providers/WebsocketContextProvider"




export default function ConnectionStatus(){
    const { isConnected } = useSocket();
    
    return(
        <div className={`text-center py-2 px-4 rounded-md mb-4 text-sm font-semibold
            ${isConnected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
             Backend Service Status: {isConnected ? 'Connected' : 'Disconnected'}
        </div>
    )
}