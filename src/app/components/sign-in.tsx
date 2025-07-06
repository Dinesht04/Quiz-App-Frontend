"use client"

import { useState, useEffect, JSX } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Sparkles, Users, Trophy, Zap, ArrowRight, Star, Target, Crown, Globe } from "lucide-react"
import Link from "next/link"

type AuthPage = {
  SignInPage: React.JSX.Element
}

export default function AuthPage({SignInPage}:AuthPage) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(false)
  const [guestLoading, setGuestLoading] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    // Redirect to dashboard
    window.location.href = "/"
  }

  const handleGuestContinue = async () => {
    setGuestLoading(true)
    // Simulate guest setup
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setGuestLoading(false)
    // Redirect to dashboard
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0">
        {/* Mouse-following gradient */}
        <div
          className="absolute w-96 h-96 bg-[#A9F99E] rounded-full opacity-20 blur-3xl transition-all duration-1000"
          style={{
            left: mousePosition.x / 8,
            top: mousePosition.y / 8,
          }}
        />

        {/* Static gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#A9F99E] rounded-full opacity-15 blur-2xl animate-pulse" />
        <div
          className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-gradient-to-r from-[#A9F99E] to-[#7DD3FC] rounded-full opacity-10 blur-xl animate-bounce"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-32 h-32 bg-purple-500 rounded-full opacity-10 blur-lg animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Floating geometric shapes */}
        <div
          className="absolute top-20 left-20 w-4 h-4 bg-[#A9F99E] rotate-45 animate-spin"
          style={{ animationDuration: "8s" }}
        />
        <div className="absolute top-40 right-32 w-6 h-6 border-2 border-[#A9F99E] rounded-full animate-ping" />
        <div className="absolute bottom-32 right-20 w-3 h-3 bg-[#A9F99E] animate-pulse" />
        <div className="absolute bottom-40 left-40 w-5 h-5 border-2 border-[#A9F99E] rotate-45 animate-bounce" />
        <div
          className="absolute top-60 left-1/2 w-2 h-2 bg-purple-400 rounded-full animate-ping"
          style={{ animationDelay: "2s" }}
        />

        {/* Floating icons */}
        <div className="absolute top-32 right-1/4 opacity-10 animate-float">
          <Brain className="w-8 h-8 text-[#A9F99E]" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 opacity-10 animate-float" style={{ animationDelay: "1s" }}>
          <Trophy className="w-6 h-6 text-[#A9F99E]" />
        </div>
        <div className="absolute top-1/3 left-20 opacity-10 animate-float" style={{ animationDelay: "2s" }}>
          <Star className="w-5 h-5 text-[#A9F99E]" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 backdrop-blur-sm bg-black/20">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-[#A9F99E] to-[#7DD3FC] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Brain className="w-6 h-6 text-black" />
          </div>
          <span className="text-2xl font-bold text-white group-hover:text-[#A9F99E] transition-colors">QuizVerse</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="#" className="text-gray-300 hover:text-[#A9F99E] transition-colors">
            Features
          </Link>
          <Link href="#" className="text-gray-300 hover:text-[#A9F99E] transition-colors">
            Leaderboard
          </Link>
          <Link href="#" className="text-gray-300 hover:text-[#A9F99E] transition-colors">
            Community
          </Link>
        </div>

        <Badge className="bg-[#A9F99E]/10 border border-[#A9F99E]/20 text-[#A9F99E] px-4 py-2">
          <div className="w-2 h-2 bg-[#A9F99E] rounded-full mr-2 animate-pulse" />
          Join the Universe
        </Badge>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Branding & Features */}
            <div className="space-y-8">
              {/* Hero Badge */}
              <div className="inline-flex items-center bg-[#A9F99E]/10 border border-[#A9F99E]/20 rounded-full px-6 py-3 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-[#A9F99E] mr-2" />
                <span className="text-[#A9F99E] font-medium">Welcome to the Future</span>
                <div className="w-2 h-2 bg-[#A9F99E] rounded-full ml-2 animate-pulse" />
              </div>

              {/* Main Headline */}
              <div>
                <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                  Enter the
                  <br />
                  <span className="bg-gradient-to-r from-[#A9F99E] to-[#7DD3FC] bg-clip-text text-transparent">
                    QuizVerse
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  Join millions of quiz enthusiasts in the ultimate knowledge battleground. Compete, learn, and dominate
                  across infinite topics.
                </p>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-[#A9F99E]/20 text-[#A9F99E] border-[#A9F99E]/30 hover:bg-[#A9F99E]/30 transition-colors px-4 py-2">
                  <Zap className="w-3 h-3 mr-1" />
                  Real-time Battles
                </Badge>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30 transition-colors px-4 py-2">
                  <Crown className="w-3 h-3 mr-1" />
                  Global Rankings
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30 transition-colors px-4 py-2">
                  <Globe className="w-3 h-3 mr-1" />
                  Infinite Topics
                </Badge>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-4">
                {[
                  { icon: Users, label: "Active Players", value: "2.5M+" },
                  { icon: Brain, label: "Quizzes", value: "500K+" },
                  { icon: Trophy, label: "Competitions", value: "10K+" },
                ].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-12 h-12 bg-[#A9F99E]/10 border border-[#A9F99E]/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-[#A9F99E]/20 transition-all duration-300 group-hover:scale-110">
                      <stat.icon className="w-6 h-6 text-[#A9F99E]" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Auth Card */}
            <div className="flex justify-center lg:justify-end">
              <Card className="w-full max-w-md bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700 backdrop-blur-sm shadow-2xl">
                <CardContent className="p-8">
                  {/* Auth Header */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#A9F99E] to-[#7DD3FC] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Target className="w-8 h-8 text-black" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Ready to Play?</h2>
                    <p className="text-gray-300">Choose your path to quiz mastery</p>
                  </div>

                   {SignInPage}

                  {/* Benefits */}
                  <div className="mt-8 pt-6 border-t border-gray-700">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-300">
                        <div className="w-2 h-2 bg-[#A9F99E] rounded-full mr-3" />
                        Instant access to 500K+ quizzes
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <div className="w-2 h-2 bg-[#A9F99E] rounded-full mr-3" />
                        Real-time multiplayer battles
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <div className="w-2 h-2 bg-[#A9F99E] rounded-full mr-3" />
                        Global leaderboards & achievements
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                      By continuing, you agree to our{" "}
                      <Link href="#" className="text-[#A9F99E] hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-[#A9F99E] hover:underline">
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="relative z-10 container mx-auto px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-[#A9F99E]/10 to-[#7DD3FC]/10 border border-[#A9F99E]/20 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Join the Quiz Revolution</h3>
                <p className="text-gray-300 mb-6">Experience the most advanced quiz platform ever created</p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>2,847 players online now</span>
                  </div>

                  <Button variant="ghost" className="text-[#A9F99E] hover:text-[#A9F99E]/80 hover:bg-[#A9F99E]/10">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
