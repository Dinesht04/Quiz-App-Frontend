"use client"

import { useQuizContext } from "@/app/providers/QuizContext"
import { Trophy, Flag, Users, Crown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGlobalContext } from "@/app/providers/GlobalContext"

export default function LiveScores() {
  const { liveScore } = useQuizContext()
  const { username } = useGlobalContext()

  const players =
    //@ts-expect-error because live score type is copied from final score but it is actually different --> we are lazy
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
      <div className="relative w-full">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600/30 to-gray-500/30 rounded-2xl sm:rounded-3xl blur-sm opacity-50"></div>
        <Card className="relative bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl sm:rounded-3xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 via-transparent to-gray-700/20"></div>
          <CardContent className="relative p-4 sm:p-6 lg:p-8 text-center">
            <div className="w-8 h-8 sm:w-10 lg:w-12 sm:h-10 lg:h-12 mx-auto mb-3 sm:mb-4 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 sm:w-5 lg:w-6 sm:h-5 lg:h-6 text-gray-300" />
            </div>
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg">Waiting for quiz to start...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      {/* Outer cosmic glow */}
      <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-[#A9F99E]/20 via-cyan-400/20 to-purple-500/20 rounded-2xl sm:rounded-3xl blur-sm opacity-50 animate-pulse"></div>

      <Card className="relative bg-black/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
        {/* Inner cosmic effects - Scaled for mobile */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#A9F99E]/5 via-transparent to-purple-500/5"></div>
        <div className="absolute top-0 right-0 w-20 sm:w-32 lg:w-40 h-20 sm:h-32 lg:h-40 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full blur-xl sm:blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 bg-gradient-to-br from-[#A9F99E]/10 to-transparent rounded-full blur-lg sm:blur-xl"></div>

        <div className="relative z-10">
          {/* Header - Mobile Responsive */}
          <CardHeader className="relative py-3 sm:py-4 lg:py-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800/80 via-gray-700/80 to-gray-800/80"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#A9F99E]/10 via-cyan-400/10 to-purple-500/10"></div>

            <CardTitle className="relative text-base sm:text-lg lg:text-2xl font-bold text-center flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <div className="w-5 h-5 sm:w-6 lg:w-7 sm:h-6 lg:h-7 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="bg-gradient-to-r from-[#A9F99E] via-cyan-400 to-purple-400 bg-clip-text text-transparent text-center">
                Live Race Progress
              </span>
              <div className="w-5 h-5 sm:w-6 lg:w-7 sm:h-6 lg:h-7 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-3 sm:p-4 lg:p-8">
            {/* Cosmic Race Track - Mobile Responsive */}
            <div className="relative mb-4 sm:mb-6 lg:mb-8">
              {/* Track Background - Responsive height */}
              <div className="relative h-12 sm:h-16 lg:h-24 bg-gradient-to-r from-gray-800/80 via-gray-700/80 to-gray-800/80 rounded-full border-2 sm:border-4 border-gray-600/50 overflow-hidden backdrop-blur-sm">
                {/* Animated cosmic background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#A9F99E]/10 via-cyan-400/10 to-[#A9F99E]/10 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse delay-500"></div>

                {/* Milestone markers - Responsive sizing */}
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
                      <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-[#A9F99E] to-cyan-400 rounded-full blur-sm sm:blur-md opacity-50"></div>
                      <div className="relative w-4 h-4 sm:w-6 lg:w-8 sm:h-6 lg:h-8 bg-gradient-to-br from-[#A9F99E] to-cyan-400 rounded-full border border-gray-800 sm:border-2 shadow-lg flex items-center justify-center">
                        <span className="text-black font-bold text-xs sm:text-xs lg:text-xs">{milestone}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Cosmic Finish Line - Responsive width */}
                <div className="absolute right-0 top-0 bottom-0 w-2 sm:w-3 lg:w-4 bg-gradient-to-r from-[#A9F99E] to-cyan-400 flex items-center justify-center rounded-r-full">
                  <Flag className="w-2 h-2 sm:w-3 lg:w-4 sm:h-3 lg:h-4 text-black" />
                </div>

                {/* Player Bubbles - Mobile Responsive */}
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
                      {/* Player glow - Responsive */}
                      <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-[#A9F99E]/50 to-cyan-400/50 rounded-full blur-sm sm:blur-md opacity-60 animate-pulse"></div>

                      <div
                        className={`relative w-6 h-6 sm:w-8 lg:w-12 sm:h-8 lg:h-12 ${getPlayerColor(index)} rounded-full border-2 sm:border-4 border-gray-800 shadow-xl`}
                      >
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                        <div className="absolute inset-1 sm:inset-2 bg-white/10 rounded-full"></div>

                        {/* Crown for leader - Responsive */}
                        {index === 0 && player.questionsAnswered > 0 && (
                          <div className="absolute -top-3 sm:-top-4 lg:-top-6 left-1/2 transform -translate-x-1/2">
                            <div className="w-3 h-3 sm:w-4 lg:w-6 sm:h-4 lg:h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                              <Crown className="w-2 h-2 sm:w-2.5 lg:w-3 sm:h-2.5 lg:h-3 text-white" />
                            </div>
                          </div>
                        )}

                        {/* Player initial - Responsive text */}
                        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                          {player.username.charAt(0).toUpperCase()}
                        </div>
                      </div>

                      {/* Player name tooltip - Mobile responsive */}
                      <div className="absolute -bottom-4 sm:-bottom-6 lg:-bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        <div className="bg-gray-800/90 text-[#A9F99E] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-medium border border-gray-600/50 backdrop-blur-sm max-w-20 sm:max-w-none truncate sm:whitespace-nowrap">
                          {player.username.length > 8 ? `${player.username.slice(0, 6)}...` : player.username}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cosmic Leaderboard - Mobile Responsive */}
            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-2 sm:mb-3 lg:mb-4 flex items-center gap-2 sm:gap-3">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                </div>
                Current Standings
              </h3>

              {sortedPlayers.map((player, index) => (
                <div key={player.username} className="relative">
                  {/* Leader glow effect */}
                  {index === 0 && (
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#A9F99E]/30 to-cyan-400/30 rounded-xl sm:rounded-2xl blur-sm opacity-60"></div>
                  )}

                  <div
                    className={`relative flex items-center justify-between p-2.5 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl shadow-lg transform hover:scale-102 transition-all duration-300 backdrop-blur-sm ${
                      index === 0
                        ? "bg-gradient-to-r from-[#A9F99E]/20 to-cyan-400/20 border-2 border-[#A9F99E]/50"
                        : "bg-gray-800/50 border border-gray-600/50"
                    }`}
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 flex-1 min-w-0">
                      <div className="relative flex-shrink-0">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full blur-sm opacity-50"></div>
                        <div
                          className={`relative w-6 h-6 sm:w-8 lg:w-10 sm:h-8 lg:h-10 ${getPlayerColor(index)} rounded-full border border-gray-800 sm:border-2 shadow-lg flex items-center justify-center`}
                        >
                          <span className="text-white font-bold text-xs sm:text-sm">
                            {player.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-white flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm sm:text-base">
                          <span className="truncate">
                            {player.username.length > 12 ? `${player.username.slice(0, 10)}...` : player.username}
                          </span>
                          <div className="flex items-center gap-1 sm:gap-2">
                            {player.username === username && (
                              <span className="text-[#A9F99E] text-xs sm:text-sm">(Me)</span>
                            )}
                            {index === 0 && player.questionsAnswered > 0 && (
                              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                <Crown className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" />
                              </div>
                            )}
                          </div>
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-400">
                          {player.questionsAnswered} / 5 questions completed
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="text-lg sm:text-xl lg:text-2xl font-black text-[#A9F99E]">#{index + 1}</div>
                      <div className="w-8 sm:w-12 lg:w-16 bg-gray-700/50 rounded-full h-1.5 sm:h-2 mt-1 border border-gray-600/30">
                        <div
                          className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${getPlayerColor(index)}`}
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

        {/* Refined floating elements - Mobile responsive */}
        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-purple-400/40 to-pink-400/40 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-cyan-400/40 to-blue-400/40 rounded-full opacity-60 animate-pulse delay-1000"></div>
      </Card>
    </div>
  )
}
