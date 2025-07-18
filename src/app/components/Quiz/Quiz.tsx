"use client"

import { useQuizContext } from "@/app/providers/QuizContext"
import { redirect } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import QuestionCard from "../Cards/QuestionCard"
import { Crown, Star, Trophy, Users, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import LiveScores from "./LiveScores"
import { useGlobalContext } from "@/app/providers/GlobalContext"
import { toPng } from "html-to-image"
import { useSocket } from "@/app/providers/WebsocketContextProvider"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Session } from "next-auth"


type QuizProps = {
  session : Session | null
}



//finalScore is an array of score, ie, score[].
export default function Quiz({ session  } : QuizProps ) {
  const { questions, joinedRoom, quizStarted, score, roomId, finalScore, quizFinished, setQuizStarted } =
    useQuizContext()
  const { username,expires } = useGlobalContext()
  const [returnToDashboard, setReturnToDashboard] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<string>("q1")
  const leaderboardRef = useRef<HTMLDivElement>(null)
  const { socket } = useSocket()

  useEffect(() => {
    if (quizFinished) {
      setCurrentQuestion("over")
    }
    if (returnToDashboard) {
      redirect("/")
    }

  }, [quizFinished, returnToDashboard, username])

  if (!joinedRoom || !quizStarted) {
    redirect("/")
  }

  function LeaveRoom() {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const payload = {
        type: "leave",
        payload: {
          roomId: roomId,
          userName: username,
          expires: expires,
        },
      }
      socket.send(JSON.stringify(payload))
    } else {
      console.warn("WebSocket not open or username input is not ready.")
      toast.error(`Sorry! Couldn't join Room ${roomId} Successfully!`, {
        position: "top-right",
        richColors: true,
        description: new Date()
          .toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })
          .replace(",", "")
          .replace(",", " at"),
      })
    }
  }

  if (currentQuestion === "over") {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Cosmic Background - Mobile Optimized */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

          {/* Floating cosmic elements - Smaller on mobile */}
          <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-8 sm:w-16 h-8 sm:h-16 bg-[#A9F99E]/20 rounded-full animate-pulse"></div>
          <div className="absolute top-20 sm:top-40 right-16 sm:right-32 w-6 sm:w-12 h-6 sm:h-12 bg-purple-400/30 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-16 sm:bottom-32 left-20 sm:left-40 w-10 sm:w-20 h-10 sm:h-20 bg-cyan-400/20 rounded-full animate-pulse delay-700"></div>

          {/* Grid pattern - Smaller on mobile */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(169,249,158,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(169,249,158,0.02)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px]"></div>
        </div>

        <div className="relative z-10 min-h-screen flex flex-col justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-4xl mx-auto">
            {/* Celebration Header - Mobile Responsive */}
            <div className="text-center mb-6 sm:mb-8 space-y-4 sm:space-y-6">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="relative">
                  <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-md sm:blur-lg opacity-50 animate-pulse"></div>
                  <div className="relative w-12 h-12 sm:w-16 md:w-20 sm:h-16 md:h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
                    <Trophy className="w-6 h-6 sm:w-8 md:w-12 sm:h-8 md:h-12 text-white animate-bounce" />
                  </div>
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 md:w-8 sm:h-6 md:h-8 bg-gradient-to-r from-[#A9F99E] to-cyan-400 rounded-full flex items-center justify-center animate-pulse">
                    <Star className="w-2 h-2 sm:w-3 md:w-4 sm:h-3 md:h-4 text-black" />
                  </div>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-[#A9F99E] via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
                Quiz Complete!
              </h1>

              <div className="relative inline-block">
                <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-[#A9F99E]/50 to-cyan-400/50 rounded-xl sm:rounded-2xl blur-sm opacity-60"></div>
                <div className="relative bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-xl sm:rounded-2xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="text-sm sm:text-base lg:text-lg">Your Score:</span>
                    <span className="text-[#A9F99E] text-xl sm:text-2xl">{score}</span>
                  </p>
                </div>
              </div>
            </div>

            {quizFinished ? (
              <div className="relative mb-6 sm:mb-8">
                <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-[#A9F99E]/20 via-cyan-400/20 to-purple-500/20 rounded-2xl sm:rounded-3xl blur-sm opacity-50 animate-pulse"></div>

                <Card
                  ref={leaderboardRef}
                  className="relative bg-black/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
                >
                  {/* Inner cosmic effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#A9F99E]/5 via-transparent to-purple-500/5"></div>
                  <div className="absolute top-0 right-0 w-20 sm:w-40 h-20 sm:h-40 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full blur-xl sm:blur-2xl"></div>

                  <div className="relative z-10">
                    <CardHeader className="relative py-4 sm:py-6 lg:py-8 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-800/80 via-gray-700/80 to-gray-800/80"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#A9F99E]/10 via-cyan-400/10 to-purple-500/10"></div>

                      <CardTitle className="relative text-xl sm:text-2xl lg:text-3xl font-bold text-center flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                          <Crown className="w-3 h-3 sm:w-4 md:w-5 sm:h-4 md:h-5 text-white" />
                        </div>
                        <span className="bg-gradient-to-r from-[#A9F99E] via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                          Final Leaderboard
                        </span>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                          <Crown className="w-3 h-3 sm:w-4 md:w-5 sm:h-4 md:h-5 text-white" />
                        </div>
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="p-4 sm:p-6 lg:p-8">
                      <div className="space-y-3 sm:space-y-4">
                        {finalScore
                          .sort((a, b) => Number.parseInt(b.score) - Number.parseInt(a.score))
                          .map((player, index) => (
                            <div key={`${player.username}-${index}`} className="relative">
                              {/* Winner glow effect */}
                              {index === 0 && (
                                <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-[#A9F99E]/40 to-cyan-400/40 rounded-xl sm:rounded-2xl blur-sm opacity-60 animate-pulse"></div>
                              )}

                              <div
                                className={`relative flex items-center justify-between p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 backdrop-blur-sm ${
                                  index === 0
                                    ? "bg-gradient-to-r from-[#A9F99E]/20 to-cyan-400/20 border-2 border-[#A9F99E]/50"
                                    : index === 1
                                      ? "bg-gradient-to-r from-gray-700/50 to-gray-600/50 border-2 border-gray-500/50"
                                      : index === 2
                                        ? "bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-500/50"
                                        : "bg-gray-800/50 border border-gray-600/50"
                                }`}
                              >
                                <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                                  <div
                                    className={`w-8 h-8 sm:w-10 lg:w-12 sm:h-10 lg:h-12 rounded-full flex items-center justify-center font-black text-sm sm:text-base lg:text-lg shadow-lg flex-shrink-0 ${
                                      index === 0
                                        ? "bg-gradient-to-r from-[#A9F99E] to-cyan-400 text-black"
                                        : index === 1
                                          ? "bg-gradient-to-r from-gray-400 to-gray-500 text-white"
                                          : index === 2
                                            ? "bg-gradient-to-r from-orange-400 to-red-500 text-white"
                                            : "bg-gradient-to-r from-blue-400 to-purple-500 text-white"
                                    }`}
                                  >
                                    {index + 1}
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-white flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 truncate">
                                      <span className="truncate">{player.username}</span>
                                      {player.username === username && (
                                        <span className="text-[#A9F99E] text-xs sm:text-sm">(Me)</span>
                                      )}
                                    </h3>
                                    {index === 0 && (
                                      <Badge className="bg-[#A9F99E]/20 text-[#A9F99E] border-[#A9F99E]/30 mt-1 text-xs">
                                        🏆 Champion
                                      </Badge>
                                    )}
                                  </div>
                                </div>

                                <div className="text-right flex-shrink-0">
                                  <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[#A9F99E]">
                                    {player.score}
                                  </div>
                                  <div className="text-xs sm:text-sm text-gray-400">points</div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </div>
            ) : (
              <div className="relative mb-6 sm:mb-8">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600/30 to-gray-500/30 rounded-2xl sm:rounded-3xl blur-sm opacity-50"></div>
                <Card className="relative bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl sm:rounded-3xl shadow-2xl">
                  <CardContent className="p-6 sm:p-8 lg:p-12 text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-pulse" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Waiting for Others...</h3>
                    <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 px-4">
                      The room is still in progress. Results will appear when everyone finishes!
                    </p>
                    <div className="flex justify-center mb-6 sm:mb-8">
                      <div className="animate-spin w-6 h-6 sm:w-8 sm:h-8 border-4 border-[#A9F99E] border-t-transparent rounded-full"></div>
                    </div>
                    <LiveScores />
                  </CardContent>
                </Card>
              </div>
            )}

            {quizFinished && (
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-xl sm:rounded-2xl blur-sm opacity-50"></div>
                  <Button
                    onClick={async () => {
                      if (!leaderboardRef.current) return
                      const dataUrl = await toPng(leaderboardRef.current, {
                        backgroundColor: "#000000",
                        skipFonts: true,
                      })
                      const link = document.createElement("a")
                      link.download = "leaderboard.png"
                      link.href = dataUrl
                      link.click()
                    }}
                    className="relative w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                  >
                    Export Leaderboard
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#A9F99E]/50 to-cyan-400/50 rounded-xl sm:rounded-2xl blur-sm opacity-50"></div>
                  <Button
                    onClick={() => {
                      LeaveRoom()
                      setQuizStarted(false)
                      setReturnToDashboard(true)
                    }}
                    className="relative w-full sm:w-auto bg-gradient-to-r from-[#A9F99E] to-cyan-400 hover:from-[#A9F99E]/90 hover:to-cyan-400/90 text-black font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                  >
                    Return to Dashboard
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Cosmic Background - Mobile Optimized */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

        {/* Floating cosmic elements - Smaller on mobile */}
        <div className="absolute top-5 sm:top-10 left-5 sm:left-10 w-10 sm:w-20 h-10 sm:h-20 bg-[#A9F99E]/5 rounded-full animate-pulse"></div>
        <div className="absolute top-1/4 right-10 sm:right-20 w-8 sm:w-16 h-8 sm:h-16 bg-yellow-400/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-1/4 w-12 sm:w-24 h-12 sm:h-24 bg-purple-400/10 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 right-5 sm:right-10 w-6 sm:w-12 h-6 sm:h-12 bg-cyan-400/10 rounded-full animate-pulse delay-700"></div>

        {/* Grid pattern - Smaller on mobile */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(169,249,158,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(169,249,158,0.02)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px]"></div>
      </div>

      <div className="relative z-10 min-h-screen p-4 sm:p-6">
        {/* Score Header - Mobile Responsive */}
        <div className="text-center mb-6 sm:mb-8 pt-4 sm:pt-8">
          <div className="relative inline-block">
            <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-[#A9F99E]/50 to-cyan-400/50 rounded-xl sm:rounded-2xl blur-sm opacity-60 animate-pulse"></div>
            <div className="relative bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-xl sm:rounded-2xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 shadow-lg">
              <div className="text-base sm:text-lg lg:text-xl font-bold text-white flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <span className="text-sm sm:text-base">Current Score:</span>
                <span className="text-[#A9F99E] text-lg sm:text-xl">{score}</span>
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Question Container - Mobile Responsive Layout */}
        <div className="flex flex-col lg:flex-row justify-center gap-4 sm:gap-6 lg:gap-8">
          {/* Main Question Area */}
          <div className="flex-1 max-w-4xl">
            {questions?.map((Question) => {
              if (currentQuestion === Question.id) {
                return (
                  <QuestionCard
                    key={Question.id}
                    Question={Question}
                    setCurrentQuestion={setCurrentQuestion}
                    roomId={roomId}
                  />
                )
              }
            })}
          </div>

          {/* Live Scores Sidebar - Stacks below on mobile */}
          <div className="w-full lg:w-80 xl:w-96">
            <LiveScores />
          </div>
        </div>
      </div>
    </div>
  )

}
