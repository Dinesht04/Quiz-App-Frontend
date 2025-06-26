'use client';
import { useContext,createContext,ReactNode, useState, Dispatch, SetStateAction } from "react";

interface GlobalContextType {
    username: string;
    roomId:string;
    expires:string;
    setExpires:Dispatch<SetStateAction<string>>
    setUsername:Dispatch<SetStateAction<string>>
    setRoomId:Dispatch<SetStateAction<string>>

}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export default function GlobalContextProvider({ children }: { children: ReactNode }){
        const [username, setUsername] = useState("");
        const [roomId, setRoomId] = useState("");
        const [expires,setExpires] = useState("");
    
        const contextValue = {
                username,
                setUsername,
                roomId,
                setRoomId,
                expires,
                setExpires
            };
        
            return (
                <GlobalContext.Provider value={contextValue}>
                    {children}
                </GlobalContext.Provider>
            );
}

// Custom hook to consume the WebSocket context
export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};