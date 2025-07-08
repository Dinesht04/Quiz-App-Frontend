import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Lightbulb, Plus, Target, Trophy } from "lucide-react";




export default function Tutorial(){

  const tutorialSteps = [
    {
      step: 1,
      title: "Create or Join",
      description: "Start a new room or join with a code",
      icon: Plus,
      color: "from-[#A9F99E] to-cyan-400",
    },
    {
      step: 2,
      title: "Choose Topic",
      description: "Pick any topic you want to quiz on",
      icon: BookOpen,
      color: "from-purple-500 to-pink-500",
    },
    {
      step: 3,
      title: "Set Difficulty",
      description: "Select from Easy to Expert level",
      icon: Target,
      color: "from-orange-500 to-red-500",
    },
    {
      step: 4,
      title: "Battle & Win",
      description: "Compete in real-time and climb ranks",
      icon: Trophy,
      color: "from-yellow-500 to-amber-500",
    },
  ]


  return(
    <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700/50 backdrop-blur-sm shadow-2xl">
    <CardHeader>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25">
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <div>
          <CardTitle className="text-xl text-white">How It Works</CardTitle>
          <CardDescription className="text-gray-400">Master the QuizVerse in 4 simple steps</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tutorialSteps.map((step, index) => (
          <div
            key={step.step}
            className="relative p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group hover:bg-gray-800/50"
          >
            <div className="flex items-start space-x-3">
              <div
                className={`w-10 h-10 bg-gradient-to-br ${step.color} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <step.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-bold text-[#A9F99E] bg-[#A9F99E]/20 px-2 py-1 rounded-full">
                    STEP {step.step}
                  </span>
                </div>
                <h3 className="font-semibold text-white mb-1">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.description}</p>
              </div>
            </div>
            {index < tutorialSteps.length - 1 && (
              <div className="hidden md:block absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-0.5 bg-gradient-to-r from-[#A9F99E] to-transparent"></div>
            )}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
  )
}
