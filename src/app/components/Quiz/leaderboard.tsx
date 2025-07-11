'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Medal, Award, Users, RotateCcw, Home } from 'lucide-react';

export default function Leaderboard() {
  const players = [
    {
      id: 1,
      name: 'Ziggy-Noodles-81',
      score: 2450,
      correct: 8,
      total: 10,
      avatar: 'ZN',
      isCurrentUser: true,
    },
    {
      id: 2,
      name: 'QuizMaster2024',
      score: 2200,
      correct: 7,
      total: 10,
      avatar: 'QM',
      isCurrentUser: false,
    },
    {
      id: 3,
      name: 'BrainBox',
      score: 1950,
      correct: 6,
      total: 10,
      avatar: 'BB',
      isCurrentUser: false,
    },
    {
      id: 4,
      name: 'SmartCookie',
      score: 1800,
      correct: 6,
      total: 10,
      avatar: 'SC',
      isCurrentUser: false,
    },
  ];

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-gray-600">
            {position}
          </div>
        );
    }
  };

  const getRankBadge = (position: number) => {
    switch (position) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-[#A9F99E] rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-black rounded-full opacity-10 blur-lg"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-[#A9F99E] rounded-full opacity-30 blur-md"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#A9F99E] to-[#84CC16] rounded-2xl mb-6 shadow-lg">
            <Trophy className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">Quiz Complete!</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Great job everyone! Here's how you performed in this round.
          </p>

          <div className="flex items-center justify-center mt-6">
            <Badge className="bg-[#A9F99E]/20 text-[#84CC16] border-[#A9F99E]/30 px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              Room: 8kg57
            </Badge>
          </div>
        </div>

        {/* Leaderboard */}
        <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-white/90 backdrop-blur-sm mb-8">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-black mb-2">
                Final Leaderboard
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#A9F99E] to-[#84CC16] rounded-full mx-auto"></div>
            </div>

            <div className="space-y-4">
              {players.map((player, index) => (
                <div
                  key={player.id}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                    player.isCurrentUser
                      ? 'border-[#A9F99E] bg-gradient-to-r from-[#A9F99E]/10 to-[#84CC16]/10 shadow-lg'
                      : 'border-gray-200 bg-white hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Rank */}
                    <div className="flex-shrink-0">
                      {getRankIcon(index + 1)}
                    </div>

                    {/* Avatar */}
                    <Avatar
                      className={`w-12 h-12 border-2 ${player.isCurrentUser ? 'border-[#A9F99E]' : 'border-gray-200'}`}
                    >
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback
                        className={`font-semibold ${
                          player.isCurrentUser
                            ? 'bg-[#A9F99E]/20 text-black'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {player.avatar}
                      </AvatarFallback>
                    </Avatar>

                    {/* Player Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-bold text-lg text-black">
                          {player.name}
                        </h3>
                        {player.isCurrentUser && (
                          <Badge className="bg-[#84CC16]/20 text-[#84CC16] border-[#84CC16]/30 text-xs">
                            You
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600">
                        {player.correct}/{player.total} correct answers
                      </p>
                    </div>

                    {/* Score */}
                    <div className="text-right">
                      <div
                        className={`inline-flex items-center px-4 py-2 rounded-xl font-bold text-lg ${getRankBadge(index + 1)}`}
                      >
                        {player.score.toLocaleString()}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">points</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#A9F99E] to-[#84CC16] hover:from-[#84CC16] hover:to-[#65A30D] text-black font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Play Again
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="py-4 border-2 border-[#A9F99E] text-[#84CC16] hover:bg-[#A9F99E]/10 rounded-xl font-semibold bg-transparent"
            >
              <Users className="w-5 h-5 mr-2" />
              New Room
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="py-4 border-2 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl font-semibold bg-transparent"
            >
              <Home className="w-5 h-5 mr-2" />
              Home
            </Button>
          </div>
        </div>

        {/* Stats Card */}
        <Card className="max-w-4xl mx-auto mt-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-[#84CC16] mb-1">10</div>
                <div className="text-sm text-gray-600">Questions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#84CC16] mb-1">4</div>
                <div className="text-sm text-gray-600">Players</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#84CC16] mb-1">
                  5:42
                </div>
                <div className="text-sm text-gray-600">Duration</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#84CC16] mb-1">
                  Geography
                </div>
                <div className="text-sm text-gray-600">Topic</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
