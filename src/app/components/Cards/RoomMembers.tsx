import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react"


type RoomMembersProps = {
  clientList:string[];
  username:string|null
}

export default function RoomMembers({clientList, username}:RoomMembersProps){
  return(
    <div>

                {clientList && clientList.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-3">
                        <Users className="w-3 h-3 text-white" />
                      </div>
                      Players in Room ({clientList.length})
                    </h3>
                    <div className="bg-gray-800/30 rounded-2xl p-4 space-y-3 max-h-40 overflow-y-auto border border-gray-700/50 backdrop-blur-sm">
                      {clientList.map((client, index) => (
                        <div
                          key={`${client}-${index}`}
                          className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-xl border border-gray-600/30 hover:bg-gray-700/50 transition-colors"
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-[#A9F99E] to-cyan-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                            {client.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-gray-200 font-medium flex-1">
                            {client} {client === username ? '(Me)' : null}{' '}
                          </span>
                          {index === 0 && (
                            <Badge
                              variant="secondary"
                              className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-xs"
                            >
                              Host
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

  )
}
