'use client';

import { useSocket } from '@/app/providers/WebsocketContextProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Message } from './Room';
import { toast } from 'sonner';
import { Session } from 'next-auth';
import { useQuizContext } from '@/app/providers/QuizContext';

type Props = {
  session: Session | null;
  roomid?: string;
};

export type chatMessage = {
  username: string;
  message: string;
  time: string;
};

export default function ChatCard({ session, roomid }: Props) {
  const { socket, isConnected } = useSocket();
  const { chatMessages } = useQuizContext();
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  function sendMessage() {
    if (
      messageInputRef.current?.value === '' ||
      messageInputRef.current?.value === null
    ) {
      toast('Cannot send Empty Messages', {
        position: 'top-right',
        richColors: true,
      });
      messageInputRef.current.focus();
      return;
    }

    if (socket && socket.readyState === WebSocket.OPEN) {
      const payload = {
        type: 'message',
        payload: {
          roomId: roomid,
          username: session?.user?.name,
          message: messageInputRef.current?.value,
          time: new Date()
            .toLocaleString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })
            .toLowerCase(),
          expires: session?.expires,
        },
      };
      socket.send(JSON.stringify(payload));
      if (messageInputRef.current) {
        messageInputRef.current.value = '';
      }
    } else {
      console.warn('WebSocket not open or inputs are not ready.');
      alert('Not connected to the server. Please wait or refresh.');
    }
  }

  return (
    <Card className="w-full h-1/3 max-w-md bg-white/80 backdrop-blur-sm shadow-2xl border border-white/20 rounded-3xl overflow-hidden">
      <CardHeader className="text-center pb-4">
        <div className="w-12 h-12 mx-auto bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
          Room Chat
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        {/* Chat Messages */}
        <ScrollArea className="h-124 w-full rounded-lg border bg-gray-50/50 p-4 mb-4">
          <div className="space-y-3">
            {chatMessages.length === 0 ? (
              <div className="text-center text-gray-500 text-sm">
                No messages yet. Start the conversation!
              </div>
            ) : (
              chatMessages.map((msg) => (
                <div key={msg.message} className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span className="font-medium">{msg.username}</span>
                    <span>{msg.time}</span>
                  </div>
                  <div className="bg-white rounded-lg p-2 shadow-sm text-sm">
                    {msg.message}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="flex space-x-2">
          <Textarea
            ref={messageInputRef}
            placeholder="Type your message..."
            className="flex-1 min-h-[40px] max-h-[0px] resize-none rounded-full border-2 border-teal-200 focus:border-teal-400"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <Button
            onClick={sendMessage}
            disabled={!isConnected}
            size="icon"
            className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 disabled:from-gray-400 disabled:to-gray-500"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
