"use client"

import { type Question, useQuizContext } from "@/app/providers/QuizContext"
import { useSocket } from "@/app/providers/WebsocketContextProvider"
import { type Dispatch, type SetStateAction, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Zap, Clock } from "lucide-react"
import { useGlobalContext } from "@/app/providers/GlobalContext"

type QuestionCardProps = {
  Question: Question
  setCurrentQuestion: Dispatch<SetStateAction<string>>
  roomId: string | undefined
}

export default function QuestionCard({ Question, setCurrentQuestion, roomId }: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const { socket } = useSocket()
  const { setQuestionsCompleted } = useQuizContext()
  const { username } = useGlobalContext()

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

  function onAnswer(option: string) {
    setSelectedOption(option)
    setIsAnswered(true)
    // Add a small delay for visual feedback
    setTimeout(() => {
      sendAnswer(option)
      setNextQuestion(Question.id)
    }, 500)
  }

  // Get question number for display
  const questionNumber = Question.id.replace("q", "")

  return (
    <div className="w-full max-w-4xl p-2 relative">
      {/* Cosmic Background Elements */}
      <div className="absolute -top-8 -right-8 w-4 h-4 bg-[#A9F99E] rounded-full animate-pulse opacity-60"></div>
      <div className="absolute -bottom-8 -left-8 w-3 h-3 bg-cyan-400 rounded-full animate-pulse delay-1000 opacity-60"></div>
      <div className="absolute top-1/2 -left-12 w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-500 opacity-40"></div>
      <div className="absolute top-1/4 -right-12 w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-700 opacity-40"></div>

      {/* Main Card with Cosmic Styling */}
      <div className="relative">
        {/* Outer glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#A9F99E]/30 via-cyan-400/30 to-purple-500/30 rounded-3xl blur-sm opacity-50 animate-pulse"></div>

        <Card className="relative bg-black/95 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden shadow-2xl">
          {/* Inner cosmic effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#A9F99E]/5 via-transparent to-purple-500/5"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-[#A9F99E]/10 to-transparent rounded-full blur-xl"></div>

          <div className="relative z-10">
            {/* Question Header */}
            <CardHeader className="relative py-8 overflow-hidden">
              {/* Header background with cosmic gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800/80 via-gray-700/80 to-gray-800/80 backdrop-blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#A9F99E]/10 via-cyan-400/10 to-purple-500/10"></div>

              {/* Floating cosmic elements in header */}
              <div className="absolute top-4 right-8 w-16 h-16 bg-gradient-to-br from-[#A9F99E]/20 to-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-4 left-8 w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-lg animate-pulse delay-1000"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#A9F99E] to-cyan-400 rounded-full blur-md opacity-50"></div>
                      <div className="relative w-12 h-12 bg-gradient-to-br from-[#A9F99E] to-cyan-400 rounded-full flex items-center justify-center shadow-lg shadow-[#A9F99E]/25">
                        <Brain className="w-6 h-6 text-black" />
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm font-medium">Question {questionNumber} of 5</p>
                      <div className="w-32 h-2 bg-gray-700/50 rounded-full mt-2 border border-gray-600/30">
                        <div
                          className="h-full bg-gradient-to-r from-[#A9F99E] to-cyan-400 rounded-full transition-all duration-500 shadow-sm shadow-[#A9F99E]/30"
                          style={{
                            width: `${(Number.parseInt(questionNumber) / 5) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 px-4 py-2 bg-gray-800/50 rounded-full border border-gray-600/30 backdrop-blur-sm">
                    <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <Clock className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-300 text-sm font-medium">Think Fast!</span>
                  </div>
                </div>

                <CardTitle className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
                  {Question.prompt}
                </CardTitle>
              </div>
            </CardHeader>

            {/* Options */}
            <CardContent className="p-8">
              <div className="space-y-4">
                {Question.options.map((option, index) => {
                  const optionLabels = ["A", "B", "C", "D"]
                  const isSelected = selectedOption === option

                  return (
                    <div key={index} className="relative">
                      {/* Option glow effect when selected */}
                      {isSelected && isAnswered && (
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#A9F99E]/50 to-cyan-400/50 rounded-2xl blur-sm opacity-60"></div>
                      )}

                      <button
                        onClick={() => !isAnswered && onAnswer(option)}
                        disabled={isAnswered}
                        className={`group relative w-full p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                          isSelected && isAnswered
                            ? "bg-gradient-to-r from-[#A9F99E]/20 to-cyan-400/20 border-[#A9F99E]/50 shadow-lg shadow-[#A9F99E]/20"
                            : isAnswered
                              ? "bg-gray-800/30 border-gray-700/50 opacity-50 cursor-not-allowed"
                              : "bg-gray-800/50 border-gray-600/50 hover:border-[#A9F99E]/50 hover:shadow-lg hover:bg-gradient-to-r hover:from-[#A9F99E]/10 hover:to-cyan-400/10 backdrop-blur-sm"
                        }`}
                      >
                        <div className="flex items-center space-x-4 text-left">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                              isSelected && isAnswered
                                ? "bg-gradient-to-r from-[#A9F99E] to-cyan-400 text-black shadow-lg shadow-[#A9F99E]/30"
                                : isAnswered
                                  ? "bg-gray-600 text-gray-400"
                                  : "bg-gradient-to-r from-purple-500 to-indigo-500 text-white group-hover:from-[#A9F99E] group-hover:to-cyan-400 group-hover:text-black shadow-lg"
                            }`}
                          >
                            {optionLabels[index]}
                          </div>

                          <div
                            className={`text-lg font-medium transition-colors duration-300 flex-1 ${
                              isSelected && isAnswered
                                ? "text-[#A9F99E]"
                                : isAnswered
                                  ? "text-gray-500"
                                  : "text-gray-200 group-hover:text-white"
                            }`}
                          >
                            {option}
                          </div>

                          {isSelected && isAnswered && (
                            <div className="ml-auto">
                              <div className="w-8 h-8 bg-gradient-to-r from-[#A9F99E] to-cyan-400 rounded-full flex items-center justify-center">
                                <Zap className="w-5 h-5 text-black animate-pulse" />
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
                <div className="mt-8 text-center">
                  <div className="relative inline-flex items-center space-x-3 px-6 py-4 rounded-2xl">
                    {/* Background glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#A9F99E]/30 to-cyan-400/30 rounded-2xl blur-sm opacity-60"></div>
                    <div className="relative bg-gray-800/80 backdrop-blur-sm border border-[#A9F99E]/30 rounded-2xl px-6 py-3 flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#A9F99E] rounded-full animate-pulse"></div>
                      <span className="text-[#A9F99E] font-semibold">Answer submitted! Moving to next question...</span>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-300"></div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </div>

          {/* Refined floating elements */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400/40 to-orange-500/40 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-gradient-to-br from-purple-400/40 to-pink-500/40 rounded-full opacity-60 animate-pulse delay-1000"></div>
        </Card>
      </div>
    </div>
  )
}
