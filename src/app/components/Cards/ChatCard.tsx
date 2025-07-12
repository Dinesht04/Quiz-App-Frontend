"use client"

import { useSocket } from "@/app/providers/WebsocketContextProvider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send } from "lucide-react"
import { useRef } from "react"
import { toast } from "sonner"
import type { Session } from "next-auth"
import { useQuizContext } from "@/app/providers/QuizContext"

type Props = {
  session: Session | null
  roomid?: string
}

export type chatMessage = {
  username: string
  message: string
  time: string
}

export default function ChatCard({ session, roomid }: Props) {
  const { socket, isConnected } = useSocket()
  const { chatMessages } = useQuizContext()
  const messageInputRef = useRef<HTMLTextAreaElement>(null)

  function sendMessage() {
    if (messageInputRef.current?.value === "" || messageInputRef.current?.value === null) {
      toast.error("Cannot send Empty Messages", {
        position: "top-right",
        richColors: true,
      })
      messageInputRef.current.focus()
      return
    }

    if (socket && socket.readyState === WebSocket.OPEN) {
      const payload = {
        type: "message",
        payload: {
          roomId: roomid,
          username: session?.user?.name,
          message: messageInputRef.current?.value,
          time: new Date()
            .toLocaleString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })
            .toLowerCase(),
          expires: session?.expires,
        },
      }
      socket.send(JSON.stringify(payload))
      if (messageInputRef.current) {
        messageInputRef.current.value = ""
      }
    } else {
      console.warn("WebSocket not open or inputs are not ready.")
      alert("Not connected to the server. Please wait or refresh.")
    }
  }

  return (
    <div className="relative">
      {/* Subtle outer glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#A9F99E]/20 via-cyan-400/20 to-purple-500/20 rounded-3xl blur-sm opacity-40"></div>

      <Card className="relative w-full max-h-[670px] bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden shadow-2xl">
        {/* Subtle inner cosmic effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#A9F99E]/3 via-transparent to-cyan-400/3"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/5 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-[#A9F99E]/5 to-transparent rounded-full blur-xl"></div>

        <div className="relative z-10">
          {/* Chat Header */}
          <CardHeader className="pb-4 pt-6">
            <CardTitle className="text-white flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#A9F99E] to-cyan-400 rounded-lg flex items-center justify-center shadow-lg shadow-[#A9F99E]/25">
                <MessageCircle className="w-4 h-4 text-black" />
              </div>
              <span className="text-xl font-semibold">Room Chat</span>
              {/* Connection Status */}
            <div className="flex items-center justify-center">
              <div
                className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs ${
                  isConnected
                    ? "bg-green-500/20 text-green-300 border border-green-500/30"
                    : "bg-red-500/20 text-red-300 border border-red-500/30"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-400" : "bg-red-400"} animate-pulse`}
                ></div>
                <span>{isConnected ? "Connected" : "Disconnected"}</span>
              </div>
            </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="px-6 pb-6 space-y-4">
            {/* Chat Messages with visible scrollbar */}
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700/30 to-gray-600/30 rounded-2xl blur-sm opacity-50"></div>
              <ScrollArea className="relative max-h-[450px] h-[300px] w-full rounded-2xl border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm p-4">
                {/* Custom scrollbar styling */}
                <style jsx global>{`
                  .scroll-area-viewport {
                    scrollbar-width: thin;
                    scrollbar-color: #A9F99E40 #1f293740;
                  }
                  .scroll-area-viewport::-webkit-scrollbar {
                    width: 8px;
                  }
                  .scroll-area-viewport::-webkit-scrollbar-track {
                    background: rgba(31, 41, 55, 0.3);
                    border-radius: 4px;
                  }
                  .scroll-area-viewport::-webkit-scrollbar-thumb {
                    background: rgba(169, 249, 158, 0.4);
                    border-radius: 4px;
                  }
                  .scroll-area-viewport::-webkit-scrollbar-thumb:hover {
                    background: rgba(169, 249, 158, 0.6);
                  }
                `}</style>

                <div className="space-y-4 pr-2">
                  {chatMessages.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-3 opacity-50">
                        <MessageCircle className="w-6 h-6 text-gray-300" />
                      </div>
                      <p className="text-gray-400 text-sm">No messages yet. Start the conversation!</p>
                    </div>
                  ) : (
                    chatMessages.map((msg, index) => (
                      <div key={index} className="space-y-2">
                        {/* Message header */}
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-[#A9F99E] to-cyan-400 rounded-full flex items-center justify-center">
                            <span className="text-black text-xs font-bold">{msg.username.charAt(0).toUpperCase()}</span>
                          </div>
                          <span className="font-medium text-[#A9F99E] text-sm">{msg.username}</span>
                          <span className="text-gray-500 text-xs">{msg.time}</span>
                        </div>

                        {/* Message content */}
                        <div className="ml-8">
                          <div className="bg-gray-700/50 rounded-xl p-3 border border-gray-600/30 backdrop-blur-sm">
                            <p className="text-gray-200 text-sm leading-relaxed">{msg.message}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Message Input */}
            <div className="flex space-x-3">
              <div className="relative flex-1">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#A9F99E]/30 to-cyan-400/30 rounded-2xl blur-sm opacity-30"></div>
                <Textarea
                  ref={messageInputRef}
                  placeholder="Type your message..."
                  className="relative flex-1 min-h-[48px] max-h-[120px] resize-none rounded-2xl border border-gray-600/50 bg-gray-800/50 text-white placeholder:text-gray-400 focus:border-[#A9F99E] focus:ring-2 focus:ring-[#A9F99E]/20 backdrop-blur-sm px-4 py-3"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      sendMessage()
                    }
                  }}
                />
              </div>

              {/* Send Button */}
              <div className="relative">
                <div className=" rounded-2xl blur-sm opacity-50"></div>
                <Button
                  onClick={sendMessage}
                  disabled={!isConnected}
                  size="icon"
                  className="relative top-3 h-12 w-12 rounded-2xl bg-gradient-to-r from-[#A9F99E] to-cyan-400 hover:from-[#A9F99E]/90 hover:to-cyan-400/90 disabled:from-gray-600 disabled:to-gray-700 text-black shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>


          </CardContent>
        </div>

        {/* Refined floating elements */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-cyan-400/40 to-blue-500/40 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-br from-[#A9F99E]/40 to-cyan-500/40 rounded-full opacity-60 animate-pulse delay-1000"></div>
      </Card>
    </div>
  )
}
