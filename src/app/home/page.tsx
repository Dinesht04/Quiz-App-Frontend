"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Sparkles,
  Zap,
  Users,
  Brain,
  Trophy,
  Rocket,
  Target,
  Crown,
  Play,
  ArrowRight,
  Globe,
  Timer,
  Award,
  TrendingUp,
  Settings,
  Home,
  Plus,
  Search,
} from "lucide-react"
import { RotateCcw } from "lucide-react"
import { redirect } from "next/navigation"


export default function QuizApp() {
  const [currentView, setCurrentView] = useState<"landing" | "dashboard" | "create" | "join" | "game" | "results">(
    "landing",
  )
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // if (currentView === "dashboard") {
  //   return <Dashboard onNavigate={setCurrentView} />
  // }

  if (currentView === "create") {
    return <CreateQuiz onBack={() => setCurrentView("dashboard")} />
  }

  if (currentView === "join") {
    return <JoinQuiz onBack={() => setCurrentView("dashboard")} />
  }

  if (currentView === "game") {
    return <GameInterface onFinish={() => setCurrentView("results")} />
  }

  if (currentView === "results") {
    return <ResultsPage onBack={() => setCurrentView("dashboard")} />
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div
          className="absolute w-96 h-96 bg-[#A9F99E] rounded-full opacity-20 blur-3xl transition-all duration-1000"
          style={{
            left: mousePosition.x / 10,
            top: mousePosition.y / 10,
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#A9F99E] rounded-full opacity-10 blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-[#A9F99E] rounded-full opacity-15 blur-xl animate-bounce" />

        {/* Floating Geometric Shapes */}
        <div
          className="absolute top-20 left-20 w-4 h-4 bg-[#A9F99E] rotate-45 animate-spin"
          style={{ animationDuration: "8s" }}
        />
        <div className="absolute top-40 right-32 w-6 h-6 border-2 border-[#A9F99E] rounded-full animate-ping" />
        <div className="absolute bottom-32 right-20 w-3 h-3 bg-[#A9F99E] animate-pulse" />
        <div className="absolute bottom-40 left-40 w-5 h-5 border-2 border-[#A9F99E] rotate-45" />
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between p-6 backdrop-blur-sm bg-black/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#A9F99E] to-[#7DD3FC] rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-bold text-white">QuizVerse</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-[#A9F99E] transition-colors">
              Features
            </a>
            <a href="#" className="text-gray-300 hover:text-[#A9F99E] transition-colors">
              Leaderboard
            </a>
            <a href="#" className="text-gray-300 hover:text-[#A9F99E] transition-colors">
              Community
            </a>
          </div>

          <Button
            onClick={() => setCurrentView("dashboard")}
            className="bg-[#A9F99E] hover:bg-[#A9F99E]/80 text-black font-semibold px-6 py-2 rounded-full"
          >
            Get Started
          </Button>
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="text-center max-w-5xl mx-auto">
            {/* Floating Badge */}
            <div className="inline-flex items-center bg-[#A9F99E]/10 border border-[#A9F99E]/20 rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-[#A9F99E] mr-2" />
              <span className="text-[#A9F99E] font-medium">The Future of Quiz Gaming</span>
              <div className="w-2 h-2 bg-[#A9F99E] rounded-full ml-2 animate-pulse" />
            </div>

            {/* Main Headline */}
            <h1 className="text-7xl md:text-8xl font-black text-white mb-6 leading-tight">
              Quiz Like
              <br />
              <span className="bg-gradient-to-r from-[#A9F99E] to-[#7DD3FC] bg-clip-text text-transparent">
                Never Before
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience the most immersive, real-time quiz platform where knowledge meets excitement. Create, compete,
              and conquer in a universe of endless possibilities.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button
                onClick={() => redirect("/signin")}
                size="lg"
                className="bg-gradient-to-r from-[#A9F99E] to-[#7DD3FC] hover:from-[#7DD3FC] hover:to-[#A9F99E] text-black font-bold px-12 py-6 rounded-2xl text-lg shadow-2xl hover:shadow-[#A9F99E]/25 transition-all duration-300 transform hover:scale-105"
              >
                <Rocket className="w-6 h-6 mr-3" />
                Launch Quiz Universe
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-[#A9F99E] text-[#A9F99E] hover:bg-[#A9F99E] hover:text-black px-12 py-6 rounded-2xl text-lg font-bold backdrop-blur-sm bg-transparent"
              >
                <Play className="w-6 h-6 mr-3" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { icon: Users, label: "Active Players", value: "2.5M+" },
                { icon: Brain, label: "Quizzes Created", value: "500K+" },
                { icon: Trophy, label: "Competitions", value: "10K+" },
                { icon: Globe, label: "Countries", value: "150+" },
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-[#A9F99E]/10 border border-[#A9F99E]/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#A9F99E]/20 transition-all duration-300">
                    <stat.icon className="w-8 h-8 text-[#A9F99E]" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              Why Choose <span className="text-[#A9F99E]">QuizVerse</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the features that make us the ultimate quiz platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description:
                  "Real-time gameplay with zero lag. Experience instant responses and seamless multiplayer action.",
                color: "from-yellow-400 to-orange-500",
              },
              {
                icon: Crown,
                title: "Competitive Edge",
                description: "Climb global leaderboards, earn achievements, and prove your knowledge supremacy.",
                color: "from-purple-400 to-pink-500",
              },
              {
                icon: Target,
                title: "Smart Matching",
                description: "AI-powered opponent matching ensures fair and exciting competitions every time.",
                color: "from-blue-400 to-cyan-500",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group"
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Interactive Demo Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-[#A9F99E]/10 to-[#7DD3FC]/10 border border-[#A9F99E]/20 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-12">
                <div className="text-center mb-8">
                  <h3 className="text-4xl font-bold text-white mb-4">Ready to Experience the Magic?</h3>
                  <p className="text-xl text-gray-300">Join millions of quiz enthusiasts worldwide</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Button
                    onClick={() => setCurrentView("dashboard")}
                    size="lg"
                    className="bg-[#A9F99E] hover:bg-[#A9F99E]/80 text-black font-bold px-10 py-4 rounded-xl text-lg shadow-xl"
                  >
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  <div className="flex items-center space-x-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <Avatar key={i} className="w-10 h-10 border-2 border-[#A9F99E]">
                          <AvatarFallback className="bg-[#A9F99E]/20 text-[#A9F99E] font-bold">
                            {String.fromCharCode(64 + i)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <div className="text-sm text-gray-300">
                      <div className="font-semibold">2,847 players online</div>
                      <div className="text-xs">Join them now!</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function Dashboard({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [selectedCategory, setSelectedCategory] = useState("all")

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#A9F99E] to-[#7DD3FC] rounded-2xl flex items-center justify-center">
                <Brain className="w-7 h-7 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">QuizVerse</h1>
                <p className="text-sm text-gray-400">Your Knowledge Universe</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search quizzes..."
                  className="bg-gray-800 border border-gray-700 rounded-xl pl-10 pr-4 py-2 text-white focus:outline-none focus:border-[#A9F99E] w-64"
                />
              </div>

              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#A9F99E]">
                <Settings className="w-5 h-5" />
              </Button>

              <Avatar className="w-10 h-10 border-2 border-[#A9F99E]">
                <AvatarFallback className="bg-[#A9F99E]/20 text-[#A9F99E] font-bold">U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card
            className="bg-gradient-to-br from-[#A9F99E]/20 to-[#7DD3FC]/20 border border-[#A9F99E]/30 cursor-pointer hover:scale-105 transition-all duration-300 group"
            onClick={() => onNavigate("create")}
          >
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-[#A9F99E] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                <Plus className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Create Quiz</h3>
              <p className="text-gray-300">Build your own quiz masterpiece</p>
            </CardContent>
          </Card>

          <Card
            className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 cursor-pointer hover:scale-105 transition-all duration-300 group"
            onClick={() => onNavigate("join")}
          >
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Join Battle</h3>
              <p className="text-gray-300">Enter the competitive arena</p>
            </CardContent>
          </Card>

          <Card
            className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 cursor-pointer hover:scale-105 transition-all duration-300 group"
            onClick={() => onNavigate("game")}
          >
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Quick Play</h3>
              <p className="text-gray-300">Jump into instant action</p>
            </CardContent>
          </Card>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">Explore Categories</h2>
            <Button variant="ghost" className="text-[#A9F99E] hover:text-[#A9F99E]/80">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {["all", "science", "history", "sports", "entertainment", "technology"].map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`rounded-full px-6 py-2 capitalize ${
                  selectedCategory === category
                    ? "bg-[#A9F99E] text-black hover:bg-[#A9F99E]/80"
                    : "border-gray-600 text-gray-300 hover:border-[#A9F99E] hover:text-[#A9F99E] bg-transparent"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Quizzes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Space Odyssey",
              description: "Test your knowledge of the cosmos",
              players: 1247,
              difficulty: "Expert",
              category: "Science",
              color: "from-blue-500 to-purple-600",
            },
            {
              title: "Ancient Civilizations",
              description: "Journey through history's greatest empires",
              players: 892,
              difficulty: "Hard",
              category: "History",
              color: "from-amber-500 to-red-600",
            },
            {
              title: "Movie Madness",
              description: "Hollywood's biggest blockbusters",
              players: 2156,
              difficulty: "Medium",
              category: "Entertainment",
              color: "from-pink-500 to-rose-600",
            },
            {
              title: "Tech Titans",
              description: "The digital revolution explained",
              players: 743,
              difficulty: "Hard",
              category: "Technology",
              color: "from-green-500 to-teal-600",
            },
            {
              title: "Sports Legends",
              description: "Champions and record breakers",
              players: 1534,
              difficulty: "Medium",
              category: "Sports",
              color: "from-orange-500 to-yellow-600",
            },
            {
              title: "Nature's Wonders",
              description: "Explore Earth's incredible biodiversity",
              players: 967,
              difficulty: "Easy",
              category: "Science",
              color: "from-emerald-500 to-green-600",
            },
          ].map((quiz, index) => (
            <Card
              key={index}
              className="bg-gray-800/50 border border-gray-700 hover:border-[#A9F99E]/50 cursor-pointer group transition-all duration-300 hover:scale-105"
              onClick={() => onNavigate("game")}
            >
              <CardContent className="p-6">
                <div
                  className={`w-full h-32 bg-gradient-to-r ${quiz.color} rounded-xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
                >
                  <Brain className="w-12 h-12 text-white" />
                </div>

                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-[#A9F99E]/20 text-[#A9F99E] border-[#A9F99E]/30">{quiz.category}</Badge>
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    {quiz.difficulty}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{quiz.title}</h3>
                <p className="text-gray-400 mb-4">{quiz.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{quiz.players.toLocaleString()} players</span>
                  </div>
                  <Button size="sm" className="bg-[#A9F99E] hover:bg-[#A9F99E]/80 text-black">
                    Play Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function CreateQuiz({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "medium",
    timeLimit: 30,
    questions: [],
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="text-gray-400 hover:text-white">
                <ArrowRight className="w-5 h-5 rotate-180" />
              </Button>
              <h1 className="text-2xl font-bold text-white">Create Your Quiz</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step >= i ? "bg-[#A9F99E] text-black" : "bg-gray-700 text-gray-400"
                    }`}
                  >
                    {i}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {step === 1 && (
            <Card className="bg-gray-800/50 border border-gray-700">
              <CardContent className="p-12">
                <div className="text-center mb-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#A9F99E] to-[#7DD3FC] rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-10 h-10 text-black" />
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-4">Let's Create Magic</h2>
                  <p className="text-xl text-gray-300">Tell us about your quiz vision</p>
                </div>

                <div className="space-y-8">
                  <div>
                    <label className="block text-lg font-semibold text-white mb-3">Quiz Title</label>
                    <input
                      type="text"
                      placeholder="Enter an exciting title..."
                      className="w-full bg-gray-700 border border-gray-600 rounded-xl px-6 py-4 text-white text-lg focus:outline-none focus:border-[#A9F99E] focus:ring-2 focus:ring-[#A9F99E]/20"
                      value={quizData.title}
                      onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-white mb-3">Description</label>
                    <textarea
                      placeholder="Describe what makes your quiz special..."
                      rows={4}
                      className="w-full bg-gray-700 border border-gray-600 rounded-xl px-6 py-4 text-white text-lg focus:outline-none focus:border-[#A9F99E] focus:ring-2 focus:ring-[#A9F99E]/20 resize-none"
                      value={quizData.description}
                      onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-lg font-semibold text-white mb-3">Category</label>
                      <select
                        className="w-full bg-gray-700 border border-gray-600 rounded-xl px-6 py-4 text-white text-lg focus:outline-none focus:border-[#A9F99E]"
                        value={quizData.category}
                        onChange={(e) => setQuizData({ ...quizData, category: e.target.value })}
                      >
                        <option value="">Select category</option>
                        <option value="science">Science</option>
                        <option value="history">History</option>
                        <option value="sports">Sports</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="technology">Technology</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-white mb-3">Difficulty</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["easy", "medium", "hard"].map((diff) => (
                          <Button
                            key={diff}
                            variant={quizData.difficulty === diff ? "default" : "outline"}
                            className={`capitalize ${
                              quizData.difficulty === diff
                                ? "bg-[#A9F99E] text-black hover:bg-[#A9F99E]/80"
                                : "border-gray-600 text-gray-300 hover:border-[#A9F99E] hover:text-[#A9F99E] bg-transparent"
                            }`}
                            onClick={() => setQuizData({ ...quizData, difficulty: diff })}
                          >
                            {diff}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center pt-8">
                    <Button
                      size="lg"
                      className="bg-[#A9F99E] hover:bg-[#A9F99E]/80 text-black font-bold px-12 py-4 rounded-xl text-lg"
                      onClick={() => setStep(2)}
                      disabled={!quizData.title || !quizData.category}
                    >
                      Continue to Questions
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

function JoinQuiz({ onBack }: { onBack: () => void }) {
  const [roomCode, setRoomCode] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gray-800/50 border border-gray-700 backdrop-blur-sm">
            <CardContent className="p-12">
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-white mb-4">Join the Battle</h2>
                <p className="text-xl text-gray-300">Enter a room code to join an existing quiz</p>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-lg font-semibold text-white mb-4">Room Code</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter 6-digit code..."
                      className="w-full bg-gray-700 border border-gray-600 rounded-xl px-6 py-6 text-white text-2xl text-center font-mono tracking-widest focus:outline-none focus:border-[#A9F99E] focus:ring-2 focus:ring-[#A9F99E]/20"
                      value={roomCode}
                      onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                      maxLength={6}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={onBack}
                    className="border-gray-600 text-gray-300 hover:border-[#A9F99E] hover:text-[#A9F99E] bg-transparent py-4 text-lg"
                  >
                    Back
                  </Button>
                  <Button
                    className="bg-[#A9F99E] hover:bg-[#A9F99E]/80 text-black font-bold py-4 text-lg"
                    disabled={roomCode.length !== 6}
                  >
                    {isSearching ? "Joining..." : "Join Quiz"}
                  </Button>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center bg-[#A9F99E]/10 border border-[#A9F99E]/20 rounded-full px-6 py-3">
                    <div className="w-2 h-2 bg-[#A9F99E] rounded-full mr-3 animate-pulse" />
                    <span className="text-[#A9F99E] font-medium">1,247 active rooms</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function GameInterface({ onFinish }: { onFinish: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(15)
  const [score, setScore] = useState(1250)

  const question = {
    text: "Which planet in our solar system has the most moons?",
    options: [
      { id: "a", text: "Jupiter", isCorrect: false },
      { id: "b", text: "Saturn", isCorrect: true },
      { id: "c", text: "Neptune", isCorrect: false },
      { id: "d", text: "Uranus", isCorrect: false },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Game Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Badge className="bg-[#A9F99E]/20 text-[#A9F99E] border-[#A9F99E]/30 px-4 py-2">
                Question {currentQuestion} of 10
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2">Space Odyssey</Badge>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 bg-red-500/20 border border-red-500/30 rounded-xl px-4 py-2">
                <Timer className="w-5 h-5 text-red-400" />
                <span className="text-2xl font-bold text-red-400">{timeLeft}s</span>
              </div>

              <div className="flex items-center space-x-2 bg-[#A9F99E]/20 border border-[#A9F99E]/30 rounded-xl px-4 py-2">
                <Trophy className="w-5 h-5 text-[#A9F99E]" />
                <span className="text-xl font-bold text-[#A9F99E]">{score.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Question Card */}
          <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700 backdrop-blur-sm mb-8">
            <CardContent className="p-12">
              <div className="text-center mb-12">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <Brain className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-white mb-6 leading-relaxed">{question.text}</h2>
                <div className="w-32 h-1 bg-gradient-to-r from-[#A9F99E] to-[#7DD3FC] rounded-full mx-auto"></div>
              </div>

              {/* Answer Options */}
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {question.options.map((option, index) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedAnswer(option.id)}
                    className={`p-8 border-2 rounded-2xl text-left transition-all duration-300 group ${
                      selectedAnswer === option.id
                        ? "border-[#A9F99E] bg-[#A9F99E]/10 shadow-2xl shadow-[#A9F99E]/20 scale-105"
                        : "border-gray-600 hover:border-[#A9F99E]/50 hover:bg-gray-700/50"
                    }`}
                  >
                    <div className="flex items-center space-x-6">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl transition-all duration-300 ${
                          selectedAnswer === option.id
                            ? "bg-[#A9F99E] text-black"
                            : "bg-gray-700 text-gray-300 group-hover:bg-gray-600"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-xl font-medium text-white flex-1">{option.text}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Submit Button */}
              {selectedAnswer && (
                <div className="text-center mt-12">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#A9F99E] to-[#7DD3FC] hover:from-[#7DD3FC] hover:to-[#A9F99E] text-black font-bold px-16 py-6 rounded-2xl text-xl shadow-2xl hover:shadow-[#A9F99E]/25 transition-all duration-300 transform hover:scale-105"
                    onClick={() => {
                      if (currentQuestion === 10) {
                        onFinish()
                      } else {
                        setCurrentQuestion(currentQuestion + 1)
                        setSelectedAnswer(null)
                        setTimeLeft(15)
                      }
                    }}
                  >
                    {currentQuestion === 10 ? "Finish Quiz" : "Next Question"}
                    <ArrowRight className="w-6 h-6 ml-3" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Player Status */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gray-800/50 border border-gray-700">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-[#A9F99E] mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">4/4</div>
                <div className="text-gray-400">Players Active</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border border-gray-700">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">85%</div>
                <div className="text-gray-400">Accuracy</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border border-gray-700">
              <CardContent className="p-6 text-center">
                <Award className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">2nd</div>
                <div className="text-gray-400">Position</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function ResultsPage({ onBack }: { onBack: () => void }) {
  const results = [
    { rank: 1, name: "QuizMaster2024", score: 2850, accuracy: 95, avatar: "QM" },
    { rank: 2, name: "You", score: 2650, accuracy: 88, avatar: "U", isCurrentUser: true },
    { rank: 3, name: "BrainBox", score: 2400, accuracy: 82, avatar: "BB" },
    { rank: 4, name: "SmartCookie", score: 2100, accuracy: 75, avatar: "SC" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-32 h-32 bg-gradient-to-br from-[#A9F99E] to-[#7DD3FC] rounded-full flex items-center justify-center mx-auto mb-8">
              <Trophy className="w-16 h-16 text-black" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">Quiz Complete!</h1>
            <p className="text-2xl text-gray-300">Amazing performance! Here's how everyone did.</p>
          </div>

          {/* Results */}
          <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700 backdrop-blur-sm mb-8">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white text-center mb-8">Final Leaderboard</h2>

              <div className="space-y-4">
                {results.map((player) => (
                  <div
                    key={player.rank}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                      player.isCurrentUser
                        ? "border-[#A9F99E] bg-gradient-to-r from-[#A9F99E]/10 to-[#7DD3FC]/10 shadow-2xl shadow-[#A9F99E]/20"
                        : "border-gray-600 bg-gray-700/50"
                    }`}
                  >
                    <div className="flex items-center space-x-6">
                      {/* Rank */}
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl ${
                          player.rank === 1
                            ? "bg-yellow-500 text-black"
                            : player.rank === 2
                              ? "bg-gray-400 text-black"
                              : player.rank === 3
                                ? "bg-amber-600 text-white"
                                : "bg-gray-600 text-white"
                        }`}
                      >
                        {player.rank}
                      </div>

                      {/* Avatar */}
                      <Avatar
                        className={`w-16 h-16 border-2 ${player.isCurrentUser ? "border-[#A9F99E]" : "border-gray-500"}`}
                      >
                        <AvatarFallback
                          className={`font-bold text-lg ${
                            player.isCurrentUser ? "bg-[#A9F99E]/20 text-[#A9F99E]" : "bg-gray-600 text-white"
                          }`}
                        >
                          {player.avatar}
                        </AvatarFallback>
                      </Avatar>

                      {/* Player Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-2xl font-bold text-white">{player.name}</h3>
                          {player.isCurrentUser && (
                            <Badge className="bg-[#A9F99E]/20 text-[#A9F99E] border-[#A9F99E]/30">You</Badge>
                          )}
                        </div>
                        <p className="text-gray-400">{player.accuracy}% accuracy</p>
                      </div>

                      {/* Score */}
                      <div className="text-right">
                        <div className="text-3xl font-bold text-[#A9F99E] mb-1">{player.score.toLocaleString()}</div>
                        <div className="text-gray-400">points</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-3 gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#A9F99E] to-[#7DD3FC] hover:from-[#7DD3FC] hover:to-[#A9F99E] text-black font-bold py-4 rounded-xl text-lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Play Again
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-[#A9F99E] text-[#A9F99E] hover:bg-[#A9F99E]/10 py-4 rounded-xl font-bold bg-transparent"
            >
              <Users className="w-5 h-5 mr-2" />
              New Quiz
            </Button>

            <Button
              variant="outline"
              onClick={onBack}
              size="lg"
              className="border-2 border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50 py-4 rounded-xl font-bold bg-transparent"
            >
              <Home className="w-5 h-5 mr-2" />
              Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Import RotateCcw icon

