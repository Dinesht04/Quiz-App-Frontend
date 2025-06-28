import { useSocket } from "@/app/providers/WebsocketContextProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { MessageCircle, Send } from "lucide-react";
import { useEffect } from "react";
import { Message } from "./Room";
import { toast } from "sonner";



export default function ChatCard(){

      const { socket, isConnected } = useSocket();

      useEffect(() => {
        if (!socket || socket.readyState !== WebSocket.OPEN) {
          console.log("🕓 socket not ready yet");
          return;
        }
    
        console.log("✅ Joining Room");
    
        socket.onmessage = (e) => {
          const message: Message = JSON.parse(e.data);

          if (message.type === "answer") {
            if (message.payload.Correct) {
              console.log("correct answer");
            }
          }
          if (message.type === "score") {
            console.log("Quiz Finished");
            console.log(message.payload);
          }
        };
      }, [socket]);
    

    return(
        
        <div>
                    {/* Chat Section */}

                  <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-2xl border border-white/20 rounded-3xl overflow-hidden">
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
        <ScrollArea className="h-80 w-full rounded-lg border bg-gray-50/50 p-4 mb-4">
          <div className="space-y-3">
            {/* {chatMessages.length === 0 ? ( */}
              <div className="text-center text-gray-500 text-sm">
                No messages yet. Start the conversation!
              </div>
            {/* ) : (
              chatMessages.map((msg) => (
                <div key={msg.id} className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span className="font-medium">{msg.user}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <div className="bg-white rounded-lg p-2 shadow-sm text-sm">
                    {msg.message}
                  </div>
                </div>
              ))
            )} */}
          </div>
        </ScrollArea>
        
                {/* Message Input */}
                <div className="flex space-x-2">
                <Textarea
                    // value={newMessage}
                    // onChange={(e) => onMessageChange(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 min-h-[40px] max-h-[80px] resize-none rounded-full border-2 border-teal-200 focus:border-teal-400"
                    onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        // onSendMessage();
                    }
                    }}
                />
                <Button
                    // onClick={onSendMessage}
                    // disabled={!newMessage.trim() || !isConnected}
                    size="icon"
                    className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 disabled:from-gray-400 disabled:to-gray-500"
                >
                    <Send className="w-4 h-4" />
                </Button>
                </div>
            </CardContent>
            </Card>
        </div>


    )
}