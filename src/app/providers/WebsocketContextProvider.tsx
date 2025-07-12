'use client';
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import { getSocket } from '@/lib/websocket';
import { toast } from 'sonner';

type WebSocketContextType = {
  socket: WebSocket | null;
  isConnected: Boolean;
};

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(WebSocketContext);

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<Boolean>(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let ws = getSocket();

    ws.onopen = () => {
      console.log('✅ Connected to WebSocket');
      toast.success('Connected to Server', {
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
      socketRef.current = ws;
      setSocket(ws);
      setIsConnected(true);
    };

    ws.onclose = () => {
      console.log('❌ Disconnected from WebSocket');
      toast.error('❌ Disconnected from Server', {
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
          label: 'Reconnect',
          onClick: () => window.location.reload(),
        },
      });
      socketRef.current = null;
      setIsConnected(false);
    };

    ws.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

    return () => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        console.log('🔌 Closing WebSocket');
        socketRef.current.close();
        setIsConnected(false);
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
}
