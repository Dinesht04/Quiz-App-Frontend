"use client"

import { useQuizContext } from "@/app/providers/QuizContext"
import { Trophy, Flag, Users, Crown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGlobalContext } from "@/app/providers/GlobalContext"

export default function LiveScores() {
  const { liveScore } = useQuizContext()
  const { username } = useGlobalContext()

  const players =
    //@ts-ignore
    liveScore?.map(([username, questionsAnswered]) => ({
      username,
      questionsAnswered: Number(questionsAnswered),
    })) || []

  // Sort players by progress (descending)
  const sortedPlayers = [...players].sort((a, b) => b.questionsAnswered - a.questionsAnswered)

  // Generate cosmic colors for each player
  const getPlayerColor = (index: number) => {
    const colors = [
      "bg-gradient-to-r from-[#A9F99E] to-cyan-400",
      "bg-gradient-to-r from-purple-500 to-pink-500",
      "bg-gradient-to-r from-cyan-500 to-blue-500",
      "bg-gradient-to-r from-orange-500 to-red-500",
      "bg-gradient-to-r from-indigo-500 to-purple-500",
      "bg-gradient-to-r from-yellow-500 to-orange-500",
    ]
    return colors[index % colors.length]
  }

  const getPlayerPosition = (questionsAnswered: number) => {
    // Calculate position along the path (0-100%)
    return Math.min((questionsAnswered / 5) * 100, 100)
  }

  if (!players.length) {
    return (
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600/30 to-gray-500/30 rounded-3xl blur-sm opacity-50"></div>
        <Card className="relative bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-3xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 via-transparent to-gray-700/20"></div>
          <CardContent className="relative p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-gray-300" />
            </div>
            <p className="text-gray-300 text-lg">Waiting for quiz to start...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="relative min-w-xl">
      {/* Outer cosmic glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#A9F99E]/20 via-cyan-400/20 to-purple-500/20 rounded-3xl blur-sm opacity-50 animate-pulse"></div>

      <Card className="relative bg-black/95 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden shadow-2xl">
        {/* Inner cosmic effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#A9F99E]/5 via-transparent to-purple-500/5"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-[#A9F99E]/10 to-transparent rounded-full blur-xl"></div>

        <div className="relative z-10">
          {/* Header */}
          <CardHeader className="relative py-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800/80 via-gray-700/80 to-gray-800/80"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#A9F99E]/10 via-cyan-400/10 to-purple-500/10"></div>

            <CardTitle className="relative text-2xl font-bold text-center flex items-center justify-center gap-3">
              <div className="w-7 h-7 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Trophy className="w-4 h-4 text-white" />
              </div>
              <span className="bg-gradient-to-r from-[#A9F99E] via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Live Race Progress
              </span>
              <div className="w-7 h-7 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Trophy className="w-4 h-4 text-white" />
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-8">
            {/* Cosmic Race Track */}
            <div className="relative mb-8">
              {/* Track Background */}
              <div className="relative h-24 bg-gradient-to-r from-gray-800/80 via-gray-700/80 to-gray-800/80 rounded-full border-4 border-gray-600/50 overflow-hidden backdrop-blur-sm">
                {/* Animated cosmic background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#A9F99E]/10 via-cyan-400/10 to-[#A9F99E]/10 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse delay-500"></div>

                {/* Milestone markers */}
                {[1, 2, 3, 4, 5].map((milestone) => (
                  <div
                    key={milestone}
                    className="absolute top-0 bottom-0 flex items-center justify-center"
                    style={{
                      left: `${(milestone / 5) * 100}%`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#A9F99E] to-cyan-400 rounded-full blur-md opacity-50"></div>
                      <div className="relative w-8 h-8 bg-gradient-to-br from-[#A9F99E] to-cyan-400 rounded-full border-2 border-gray-800 shadow-lg flex items-center justify-center">
                        <span className="text-black font-bold text-xs">{milestone}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Cosmic Finish Line */}
                <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[#A9F99E] to-cyan-400 flex items-center justify-center rounded-r-full">
                  <Flag className="w-4 h-4 text-black" />
                </div>

                {/* Player Bubbles */}
                {sortedPlayers.map((player, index) => (
                  <div
                    key={player.username}
                    className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-1000 ease-out"
                    style={{
                      left: `${getPlayerPosition(player.questionsAnswered)}%`,
                      transform: "translateY(-50%) translateX(-50%)",
                      zIndex: 10 - index,
                    }}
                  >
                    <div className="relative">
                      {/* Player glow */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#A9F99E]/50 to-cyan-400/50 rounded-full blur-md opacity-60 animate-pulse"></div>

                      <div
                        className={`relative w-12 h-12 ${getPlayerColor(index)} rounded-full border-4 border-gray-800 shadow-xl`}
                      >
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                        <div className="absolute inset-2 bg-white/10 rounded-full"></div>

                        {/* Crown for leader */}
                        {index === 0 && player.questionsAnswered > 0 && (
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                            <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                              <Crown className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        )}

                        {/* Player initial */}
                        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                          {player.username.charAt(0).toUpperCase()}
                        </div>
                      </div>

                      {/* Player name tooltip */}
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        <div className="bg-gray-800/90 text-[#A9F99E] px-2 py-1 rounded text-xs font-medium border border-gray-600/50 backdrop-blur-sm">
                          {player.username}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cosmic Leaderboard */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Users className="w-3 h-3 text-white" />
                </div>
                Current Standings
              </h3>

              {sortedPlayers.map((player, index) => (
                <div key={player.username} className="relative">
                  {/* Leader glow effect */}
                  {index === 0 && (
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#A9F99E]/30 to-cyan-400/30 rounded-2xl blur-sm opacity-60"></div>
                  )}

                  <div
                    className={`relative flex items-center justify-between p-4 rounded-2xl shadow-lg transform hover:scale-102 transition-all duration-300 backdrop-blur-sm ${
                      index === 0
                        ? "bg-gradient-to-r from-[#A9F99E]/20 to-cyan-400/20 border-2 border-[#A9F99E]/50"
                        : "bg-gray-800/50 border border-gray-600/50"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full blur-sm opacity-50"></div>
                        <div
                          className={`relative w-10 h-10 ${getPlayerColor(index)} rounded-full border-2 border-gray-800 shadow-lg flex items-center justify-center`}
                        >
                          <span className="text-white font-bold text-sm">
                            {player.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-white flex items-center gap-2">
                          {player.username}
                          {player.username === username ? <span className="text-[#A9F99E]"> (Me)</span> : null}
                          {index === 0 && player.questionsAnswered > 0 && (
                            <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                              <Crown className="w-2 h-2 text-white" />
                            </div>
                          )}
                        </h4>
                        <p className="text-sm text-gray-400">{player.questionsAnswered} / 5 questions completed</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-black text-[#A9F99E]">#{index + 1}</div>
                      <div className="w-16 bg-gray-700/50 rounded-full h-2 mt-1 border border-gray-600/30">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${getPlayerColor(index)}`}
                          style={{
                            width: `${(player.questionsAnswered / 5) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </div>

        {/* Refined floating elements */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-purple-400/40 to-pink-400/40 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-gradient-to-br from-cyan-400/40 to-blue-400/40 rounded-full opacity-60 animate-pulse delay-1000"></div>
      </Card>
    </div>
  )
}
