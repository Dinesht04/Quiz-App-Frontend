import type { Metadata } from 'next';
import './globals.css';
import GlobalContextProvider from './providers/GlobalContext';
import { WebSocketProvider } from './providers/WebsocketContextProvider';
import QuizContextProvider from './providers/QuizContext';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'QuizVerse',
  description: 'Quiz by you, for you',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='bg-black'>
        <GlobalContextProvider>
          <WebSocketProvider>
            <QuizContextProvider>
              {children}
              <Toaster />
            </QuizContextProvider>
          </WebSocketProvider>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
