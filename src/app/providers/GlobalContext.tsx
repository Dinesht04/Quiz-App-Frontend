'use client';
import { redirect } from 'next/navigation';
import {
  useContext,
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

interface GlobalContextType {
  username: string|null;
  roomId: string;
  expires: string;
  setExpires: Dispatch<SetStateAction<string>>;
  setUsername: Dispatch<SetStateAction<string|null>>;
  setRoomId: Dispatch<SetStateAction<string>>;
  isGuest: boolean;
  setIsGuest: Dispatch<SetStateAction<boolean>>;
  cookie: boolean;
  setCookie: Dispatch<SetStateAction<boolean>>;
  }

type Cookie = {
  guestUser:string|null,
  createdAt: Date,
  username: string,
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export default function GlobalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [username, setUsername] = useState<string|null>('');
  const [roomId, setRoomId] = useState('');
  const [expires, setExpires] = useState('');
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [cookie,setCookie] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem('guestUser')) {
        setCookie(true);
        setUsername(localStorage.getItem('guestUsername'));
        setIsGuest(true);
      }
  }, []);

  const contextValue = {
    username,
    setUsername,
    roomId,
    setRoomId,
    expires,
    setExpires,
    isGuest,
    setIsGuest,
    cookie,
    setCookie
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
