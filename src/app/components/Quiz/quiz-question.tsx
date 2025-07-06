"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, Trophy, CheckCircle } from "lucide-react"

export default function QuizQuestion() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(15)
  const [isAnswered, setIsAnswered] = useState(false)

  const question = "What is the capital city of Japan?"
  const answers = [
    { id: "a", text: "Tokyo", isCorrect: true },
    { id: "b", text: "Osaka", isCorrect: false },
    { id: "c", text: "Kyoto", isCorrect: false },
    { id: "d", text: "Hiroshima", isCorrect: false },
  ]

  const handleAnswerSelect = (answerId: string) => {
    if (!isAnswered) {
      setSelectedAnswer(answerId)
      setIsAnswered(true)
    }
  }

  const getAnswerStyle = (answer: { id: string; text: string; isCorrect: boolean }) => {
    if (!isAnswered) {
      return selectedAnswer === answer.id
        ? "border-[#A9F99E] bg-[#A9F99E]/20 shadow-lg transform scale-105"
        : "border-gray-200 hover:border-[#A9F99E]/50 hover:bg-[#A9F99E]/10"
    }

    if (answer.isCorrect) {
      return "border-green-500 bg-green-50 shadow-lg"
    }

    if (selectedAnswer === answer.id && !answer.isCorrect) {
      return "border-red-500 bg-red-50 shadow-lg"
    }

    return "border-gray-200 bg-gray-50"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-[#A9F99E] rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-black rounded-full opacity-10 blur-lg"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Badge className="bg-[#A9F99E]/20 text-[#84CC16] border-[#A9F99E]/30 px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              Room: 8kg57
            </Badge>
            <Badge className="bg-black/10 text-black border-black/20 px-4 py-2">Question 3 of 10</Badge>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
              <Clock className="w-4 h-4 text-red-500" />
              <span className="font-bold text-red-500">{timeLeft}s</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
              <Trophy className="w-4 h-4 text-[#84CC16]" />
              <span className="font-bold text-black">1,250</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={30} className="h-3 bg-gray-200" />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Progress</span>
            <span>30% Complete</span>
          </div>
        </div>

        {/* Question Card */}
        <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-white/90 backdrop-blur-sm mb-8">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <Badge className="bg-[#A9F99E]/20 text-[#84CC16] border-[#A9F99E]/30 mb-4">Geography</Badge>
              <h2 className="text-3xl font-bold text-black mb-4 leading-relaxed">{question}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#A9F99E] to-[#84CC16] rounded-full mx-auto"></div>
            </div>

            {/* Answer Options */}
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {answers.map((answer, index) => (
                <button
                  key={answer.id}
                  onClick={() => handleAnswerSelect(answer.id)}
                  disabled={isAnswered}
                  className={`p-6 border-2 rounded-2xl text-left transition-all duration-300 ${getAnswerStyle(answer)} ${
                    !isAnswered ? "hover:shadow-lg cursor-pointer" : "cursor-default"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        isAnswered && answer.isCorrect
                          ? "bg-green-500"
                          : isAnswered && selectedAnswer === answer.id && !answer.isCorrect
                            ? "bg-red-500"
                            : selectedAnswer === answer.id
                              ? "bg-[#84CC16]"
                              : "bg-gray-400"
                      }`}
                    >
                      {isAnswered && answer.isCorrect ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </div>
                    <span className="text-lg font-medium text-black flex-1">{answer.text}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Submit Button */}
            {selectedAnswer && !isAnswered && (
              <div className="text-center mt-8">
                <Button
                  onClick={() => setIsAnswered(true)}
                  size="lg"
                  className="bg-gradient-to-r from-[#A9F99E] to-[#84CC16] hover:from-[#84CC16] hover:to-[#65A30D] text-black font-semibold px-12 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Submit Answer
                </Button>
              </div>
            )}

            {/* Result Message */}
            {isAnswered && (
              <div className="text-center mt-8 p-6 bg-gradient-to-r from-[#A9F99E]/20 to-[#84CC16]/20 rounded-2xl border border-[#A9F99E]/30">
                <div className="flex items-center justify-center mb-4">
                  {selectedAnswer === answers.find((a) => a.isCorrect)?.id ? (
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">
                  {selectedAnswer === answers.find((a) => a.isCorrect)?.id ? "Correct!" : "Incorrect!"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {selectedAnswer === answers.find((a) => a.isCorrect)?.id
                    ? "Great job! You earned 500 points."
                    : `The correct answer was ${answers.find((a) => a.isCorrect)?.text}.`}
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#A9F99E] to-[#84CC16] hover:from-[#84CC16] hover:to-[#65A30D] text-black font-semibold px-8 py-3 rounded-xl shadow-lg"
                >
                  Next Question
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Player Status */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Users className="w-5 h-5 text-[#84CC16]" />
                  <span className="font-semibold text-black">Players: 3/4 answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Waiting for others...</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
