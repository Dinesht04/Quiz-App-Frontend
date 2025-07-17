'use client';
import {
  useContext,
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

import {
  checkAuthJsCookie,
  checkMyCookie,
  getMyCookie,
} from '../actions/cookies';

interface GlobalContextType {
  username: string | null;
  roomId: string;
  expires: string;
  setExpires: Dispatch<SetStateAction<string>>;
  setUsername: Dispatch<SetStateAction<string | null>>;
  setRoomId: Dispatch<SetStateAction<string>>;
  isGuest: boolean;
  setIsGuest: Dispatch<SetStateAction<boolean>>;
  cookie: boolean;
  setCookie: Dispatch<SetStateAction<boolean>>;
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}

// type Cookie = {
//   guestUser:string|null,
//   createdAt: Date,
//   username: string,
// }

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export default function GlobalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [username, setUsername] = useState<string | null>(null); // Initialize with null
  const [roomId, setRoomId] = useState('');
  const [expires, setExpires] = useState('');
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [cookie, setCookie] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadGuestData() {
      const hasGuestCookie = await checkMyCookie();
      const hasAuthJsCookie = await checkAuthJsCookie();

      if (hasGuestCookie) {
        console.log("Guest sign in detected")
        const guestData = await getMyCookie();
        setUsername(guestData.guestUsername);
        setIsGuest(true);
        setLoggedIn(true);
        setCookie(hasGuestCookie);
      } else if (hasAuthJsCookie) {
        // google sign in cookie
        console.log("google sign in detected")
        setIsGuest(false);
        setLoggedIn(true);
        setCookie(hasAuthJsCookie);
        
      } else {
        console.log("No sign in detected")
        setUsername(null); // Ensure username is null if no guest cookie
        setIsGuest(false);
      }
    }

    try {
      loadGuestData();
    } catch (err) {
      console.log('Global context error' + err);
    } finally {
      setLoading(false);
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
    setCookie,
    loggedIn,
    setLoggedIn,
    loading,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      'useGlobalContext must be used within a GlobalContextProvider',
    );
  }
  return context;
};
