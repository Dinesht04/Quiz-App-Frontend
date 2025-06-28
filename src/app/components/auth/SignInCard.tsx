import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogIn, Play, Users, Zap } from 'lucide-react';
import { SignIn } from './AuthFunctions';

export default function SignInCard() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <Card className="w-full max-w-lg bg-white/80 backdrop-blur-sm shadow-2xl border border-white/20 rounded-3xl overflow-hidden">
        <CardHeader className="text-center space-y-6 pb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Play className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Welcome to QuizTogether
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              Sign in to join the ultimate real-time quiz experience
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 px-8 pb-8">
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Create rooms, challenge friends, and test your knowledge together
              on any topic you want!
            </p>

            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Multiplayer</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Real-time</span>
              </div>
              <div className="flex items-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Instant</span>
              </div>
            </div>
          </div>

          <div className="h-14 flex justify-center items-center text-white rounded-full transform hover:scale-105 transition-all duration-300 font-semibold text-lg">
            <SignIn />
          </div>

          <div className="text-center text-sm text-gray-500">
            Ready to challenge your friends and test your knowledge?
          </div>
        </CardContent>

        {/* Floating Elements */}
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </Card>
    </div>
  );
}
