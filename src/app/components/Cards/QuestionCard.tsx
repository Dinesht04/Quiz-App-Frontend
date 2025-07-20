"use client"

import { type Question, useQuizContext } from "@/app/providers/QuizContext"
import { useSocket } from "@/app/providers/WebsocketContextProvider"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Zap, Clock, Bolt, Timer, Target } from "lucide-react"
import { useGlobalContext } from "@/app/providers/GlobalContext"

type QuestionCardProps = {
  Question: Question
  roomId: string | undefined
}

export default function QuestionCard({ Question, roomId }: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const { socket } = useSocket()
  const { setQuestionsCompleted,setCurrentQuestion,roomType,currentQuestion } = useQuizContext()
  const { username } = useGlobalContext()

  const isLightningRound = roomType === "Lightning";

  console.log("in quiz card, current ques is", currentQuestion)

  function setNextQuestion(currentQues: string | null) {
    switch (currentQues) {
      case "q1":
        setCurrentQuestion("q2")
        break
      case "q2":
        setCurrentQuestion("q3")
        break
      case "q3":
        setCurrentQuestion("q4")
        break
      case "q4":
        setCurrentQuestion("q5")
        break
      case "q5":
        setCurrentQuestion("over")
        finishQuiz()
        setQuestionsCompleted(true)
        break
      default:
        setCurrentQuestion("idk")
        break
    }
  }

  function sendAnswer(option: string) {
    const payload = {
      type: "answer",
      payload: {
        QuestionId: Question.id,
        Answer: option,
        roomId: roomId,
        username: username,
      },
    }
    socket?.send(JSON.stringify(payload))
  }

  function finishQuiz() {
    const payload = {
      type: "finish",
      payload: {
        roomId: roomId,
      },
    }
    socket?.send(JSON.stringify(payload))
  }

  function onQuizAnswer(option: string) {
    setSelectedOption(option)
    setIsAnswered(true)
    // Add a small delay for visual feedback
    setTimeout(() => {
      sendAnswer(option)
      setNextQuestion(Question.id)
    }, 500)
  }

  function onLightningAnswer(option: string) {
    setSelectedOption(option)
    setIsAnswered(true)
    // Add a small delay for visual feedback
    setTimeout(() => {
      sendAnswer(option)
      // For lightning rounds, don't auto-advance - let backend handle it
    }, 300) // Shorter delay for lightning rounds
  }

  // Get question number for display
  const questionNumber = Question.id.replace("q", "")

  const lightningColors = {
    primary: "from-yellow-400 to-orange-500",
    secondary: "from-orange-500 to-red-500",
    accent: "from-red-500 to-pink-500",
    glow: "from-yellow-400/30 to-orange-500/30",
    border: "border-yellow-400/50",
    text: "text-yellow-400",
  }

  const normalColors = {
    primary: "from-[#A9F99E] to-cyan-400",
    secondary: "from-purple-500 to-indigo-500",
    accent: "from-cyan-400 to-blue-500",
    glow: "from-[#A9F99E]/30 to-cyan-400/30",
    border: "border-[#A9F99E]/50",
    text: "text-[#A9F99E]",
  }

  const colors = isLightningRound ? lightningColors : normalColors


  return (
    <div className="w-full max-w-4xl p-2 sm:p-4 relative">
    {/* Cosmic Background Elements - Enhanced for Lightning */}
    <div
      className={`absolute -top-4 sm:-top-8 -right-4 sm:-right-8 w-3 h-3 sm:w-4 sm:h-4 ${isLightningRound ? "bg-yellow-400" : "bg-[#A9F99E]"} rounded-full animate-pulse opacity-60`}
    ></div>
    <div
      className={`absolute -bottom-4 sm:-bottom-8 -left-4 sm:-left-8 w-2 h-2 sm:w-3 sm:h-3 ${isLightningRound ? "bg-orange-400" : "bg-cyan-400"} rounded-full animate-pulse delay-1000 opacity-60`}
    ></div>
    <div
      className={`absolute top-1/2 -left-6 sm:-left-12 w-1.5 h-1.5 sm:w-2 sm:h-2 ${isLightningRound ? "bg-red-400" : "bg-purple-400"} rounded-full animate-pulse delay-500 opacity-40`}
    ></div>
    <div
      className={`absolute top-1/4 -right-6 sm:-right-12 w-1.5 h-1.5 sm:w-2 sm:h-2 ${isLightningRound ? "bg-yellow-500" : "bg-pink-400"} rounded-full animate-pulse delay-700 opacity-40`}
    ></div>

    {/* Lightning Round Specific Effects */}
    {isLightningRound && (
      <>
        <div className="absolute top-0 left-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-ping opacity-75"></div>
        <div className="absolute bottom-0 right-1/4 w-1 h-1 bg-orange-300 rounded-full animate-ping delay-500 opacity-75"></div>
        <div className="absolute top-1/3 right-0 w-0.5 h-0.5 bg-red-300 rounded-full animate-ping delay-1000 opacity-75"></div>
      </>
    )}

    {/* Main Card with Dynamic Cosmic Styling */}
    <div className="relative">
      {/* Outer glow effect - Enhanced for Lightning */}
      <div
        className={`absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r ${colors.glow} ${isLightningRound ? "via-red-500/30" : "via-cyan-400/30"} to-purple-500/30 rounded-2xl sm:rounded-3xl blur-sm opacity-50 ${isLightningRound ? "animate-pulse" : "animate-pulse"}`}
      ></div>

      <Card className="relative bg-black/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
        {/* Inner cosmic effects - Enhanced for Lightning */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${isLightningRound ? "from-yellow-400/5 via-orange-500/5" : "from-[#A9F99E]/5"} via-transparent to-purple-500/5`}
        ></div>
        <div
          className={`absolute top-0 right-0 w-20 sm:w-32 lg:w-40 h-20 sm:h-32 lg:h-40 bg-gradient-to-br ${isLightningRound ? "from-orange-400/10" : "from-cyan-400/10"} to-transparent rounded-full blur-xl sm:blur-2xl`}
        ></div>
        <div
          className={`absolute bottom-0 left-0 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 bg-gradient-to-br ${isLightningRound ? "from-yellow-400/10" : "from-[#A9F99E]/10"} to-transparent rounded-full blur-lg sm:blur-xl`}
        ></div>

        <div className="relative z-10">
          {/* Question Header - Enhanced for Lightning */}
          <CardHeader className="relative py-4 sm:py-6 lg:py-8 overflow-hidden">
            {/* Header background with dynamic cosmic gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800/80 via-gray-700/80 to-gray-800/80 backdrop-blur-sm"></div>
            <div
              className={`absolute inset-0 bg-gradient-to-r ${isLightningRound ? "from-yellow-400/10 via-orange-500/10 to-red-500/10" : "from-[#A9F99E]/10 via-cyan-400/10 to-purple-500/10"}`}
            ></div>

            {/* Floating cosmic elements in header - Enhanced for Lightning */}
            <div
              className={`absolute top-2 sm:top-4 right-4 sm:right-8 w-8 sm:w-12 lg:w-16 h-8 sm:h-12 lg:h-16 bg-gradient-to-br ${isLightningRound ? "from-yellow-400/20 to-orange-500/20" : "from-[#A9F99E]/20 to-cyan-400/20"} rounded-full blur-lg sm:blur-xl animate-pulse`}
            ></div>
            <div
              className={`absolute bottom-2 sm:bottom-4 left-4 sm:left-8 w-6 sm:w-8 lg:w-12 h-6 sm:h-8 lg:h-12 bg-gradient-to-br ${isLightningRound ? "from-orange-500/20 to-red-500/20" : "from-purple-500/20 to-pink-500/20"} rounded-full blur-md sm:blur-lg animate-pulse delay-1000`}
            ></div>

            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="relative">
                    <div
                      className={`absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r ${colors.primary} rounded-full blur-sm sm:blur-md opacity-50`}
                    ></div>
                    <div
                      className={`relative w-8 h-8 sm:w-10 lg:w-12 sm:h-10 lg:h-12 bg-gradient-to-br ${colors.primary} rounded-full flex items-center justify-center shadow-lg ${isLightningRound ? "shadow-yellow-400/25" : "shadow-[#A9F99E]/25"}`}
                    >
                      {isLightningRound ? (
                        <Bolt className="w-4 h-4 sm:w-5 lg:w-6 sm:h-5 lg:h-6 text-black animate-pulse" />
                      ) : (
                        <Brain className="w-4 h-4 sm:w-5 lg:w-6 sm:h-5 lg:h-6 text-black" />
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-300 text-xs sm:text-sm font-medium">
                      {isLightningRound ? "Lightning Round" : `Question ${questionNumber} of 5`}
                    </p>
                    {!isLightningRound && (
                      <div className="w-24 sm:w-32 h-1.5 sm:h-2 bg-gray-700/50 rounded-full mt-1 sm:mt-2 border border-gray-600/30">
                        <div
                          className={`h-full bg-gradient-to-r ${colors.primary} rounded-full transition-all duration-500 shadow-sm ${isLightningRound ? "shadow-yellow-400/30" : "shadow-[#A9F99E]/30"}`}
                          style={{
                            width: `${(Number.parseInt(questionNumber) / 5) * 100}%`,
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Timer Display - Enhanced for Lightning */}
                <div
                  className={`flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-1.5 sm:py-2 ${isLightningRound ? "bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500/30" : "bg-gray-800/50 border-gray-600/30"} rounded-full border backdrop-blur-sm`}
                >
                  <div
                    className={`w-4 h-4 sm:w-5 lg:w-6 sm:h-5 lg:h-6 bg-gradient-to-r ${colors.secondary} rounded-full flex items-center justify-center`}
                  >
                    {isLightningRound ? (
                      <Timer className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white animate-pulse" />
                    ) : (
                      <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                    )}
                  </div>
                  <span
                    className={`${isLightningRound ? "text-orange-300" : "text-gray-300"} text-xs sm:text-sm font-medium`}
                  >
                    {isLightningRound ? `${30}s` : "Think Fast!"}
                  </span>
                  {isLightningRound && (
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                      <Zap className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-black" />
                    </div>
                  )}
                </div>
              </div>

              {/* Lightning Round Special Header */}
              {isLightningRound && (
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                      <Target className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                    </div>
                    <span className="text-yellow-400 font-bold text-sm sm:text-base lg:text-lg animate-pulse">
                      FASTEST FINGER FIRST
                    </span>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center animate-pulse delay-300">
                      <Bolt className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-orange-300 text-xs sm:text-sm font-medium">
                      Answer as quickly as possible! Speed matters!
                    </p>
                  </div>
                </div>
              )}

              <CardTitle className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white leading-relaxed">
                {Question.prompt}
              </CardTitle>
            </div>
          </CardHeader>

          {/* Options - Enhanced for Lightning */}
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <div className="space-y-3 sm:space-y-4">
              {Question.options.map((option, index) => {
                const optionLabels = ["A", "B", "C", "D"]
                const isSelected = selectedOption === option
                return (
                  <div key={index} className="relative">
                    {/* Option glow effect when selected - Enhanced for Lightning */}
                    {isSelected && isAnswered && (
                      <div
                        className={`absolute -inset-0.5 bg-gradient-to-r ${colors.glow} rounded-xl sm:rounded-2xl blur-sm opacity-60`}
                      ></div>
                    )}

                    <button
                      onClick={() =>
                        !isAnswered && (isLightningRound ? onLightningAnswer(option) : onQuizAnswer(option))
                      }
                      disabled={isAnswered}
                      className={`group relative w-full p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                        isSelected && isAnswered
                          ? `bg-gradient-to-r ${isLightningRound ? "from-yellow-400/20 to-orange-500/20" : "from-[#A9F99E]/20 to-cyan-400/20"} ${colors.border} shadow-lg ${isLightningRound ? "shadow-yellow-400/20" : "shadow-[#A9F99E]/20"}`
                          : isAnswered
                            ? "bg-gray-800/30 border-gray-700/50 opacity-50 cursor-not-allowed"
                            : `bg-gray-800/50 border-gray-600/50 hover:${colors.border} hover:shadow-lg hover:bg-gradient-to-r ${isLightningRound ? "hover:from-yellow-400/10 hover:to-orange-500/10" : "hover:from-[#A9F99E]/10 hover:to-cyan-400/10"} backdrop-blur-sm`
                      }`}
                    >
                      <div className="flex items-center space-x-3 sm:space-x-4 text-left">
                        <div
                          className={`w-8 h-8 sm:w-10 lg:w-12 sm:h-10 lg:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 ${
                            isSelected && isAnswered
                              ? `bg-gradient-to-r ${colors.primary} text-black shadow-lg ${isLightningRound ? "shadow-yellow-400/30" : "shadow-[#A9F99E]/30"}`
                              : isAnswered
                                ? "bg-gray-600 text-gray-400"
                                : `bg-gradient-to-r ${colors.secondary} text-white group-hover:${colors.primary.replace("bg-gradient-to-r", "")} group-hover:text-black shadow-lg`
                          }`}
                        >
                          {optionLabels[index]}
                        </div>
                        <div
                          className={`text-sm sm:text-base lg:text-lg font-medium transition-colors duration-300 flex-1 ${
                            isSelected && isAnswered
                              ? colors.text
                              : isAnswered
                                ? "text-gray-500"
                                : "text-gray-200 group-hover:text-white"
                          }`}
                        >
                          {option}
                        </div>
                        {isSelected && isAnswered && (
                          <div className="ml-auto">
                            <div
                              className={`w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r ${colors.primary} rounded-full flex items-center justify-center`}
                            >
                              <Zap className="w-3 h-3 sm:w-4 lg:w-5 sm:h-4 lg:h-5 text-black animate-pulse" />
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  </div>
                )
              })}
            </div>

            {isAnswered && (
              <div className="mt-6 sm:mt-8 text-center">
                <div className="relative inline-flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl">
                  {/* Background glow */}
                  <div
                    className={`absolute -inset-0.5 bg-gradient-to-r ${colors.glow} rounded-xl sm:rounded-2xl blur-sm opacity-60`}
                  ></div>
                  <div
                    className={`relative bg-gray-800/80 backdrop-blur-sm border ${colors.border} rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex items-center space-x-2 sm:space-x-3`}
                  >
                    <div
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${isLightningRound ? "bg-yellow-400" : "bg-[#A9F99E]"} rounded-full animate-pulse`}
                    ></div>
                    <span className={`${colors.text} font-semibold text-sm sm:text-base`}>
                      {isLightningRound
                        ? "Answer submitted! Waiting for next question..."
                        : "Answer submitted! Moving to next question..."}
                    </span>
                    <div
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${isLightningRound ? "bg-orange-400" : "bg-cyan-400"} rounded-full animate-pulse delay-300`}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </div>

        {/* Refined floating elements - Enhanced for Lightning */}
        <div
          className={`absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br ${isLightningRound ? "from-yellow-400/40 to-orange-500/40" : "from-yellow-400/40 to-orange-500/40"} rounded-full opacity-60 animate-pulse`}
        ></div>
        <div
          className={`absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br ${isLightningRound ? "from-orange-400/40 to-red-500/40" : "from-purple-400/40 to-pink-500/40"} rounded-full opacity-60 animate-pulse delay-1000`}
        ></div>
      </Card>
    </div>
  </div>
)
}
