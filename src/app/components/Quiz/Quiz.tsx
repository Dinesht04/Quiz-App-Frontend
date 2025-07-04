//Quiz.tsx
'use client';

import { useQuizContext } from '@/app/providers/QuizContext';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import QuestionCard from '../Cards/QuestionCard';
import { Badge, Crown, Star, Trophy, Users, Zap } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LiveScores from './LiveScores';
import { useGlobalContext } from '@/app/providers/GlobalContext';

type score = {
  username: string;
  score: string;
};

//finalScore is an array of score, ie, score[].

export default function Quiz() {
  const {
    questions,
    joinedRoom,
    quizStarted,
    score,
    roomId,
    finalScore,
    quizFinished,
  } = useQuizContext();
  const { username } = useGlobalContext();

  const [currentQuestion, setCurrentQuestion] = useState<string>('q1');

  if (!joinedRoom || !quizStarted) {
    redirect('/');
  }

  if (currentQuestion === 'over') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Celebration Header */}
          <div className="text-center mb-8 space-y-4">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Trophy className="w-20 h-20 text-yellow-400 animate-bounce" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                  <Star className="w-5 h-5 text-yellow-700" />
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
              Quiz Complete!
            </h1>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-8 py-4 inline-block">
              <p className="text-2xl font-bold text-white flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-400" />
                Your Score: {score}
              </p>
            </div>
          </div>

          {quizFinished ? (
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-8">
                <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-3">
                  <Crown className="w-8 h-8 text-yellow-300" />
                  Final Leaderboard
                  <Crown className="w-8 h-8 text-yellow-300" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {finalScore
                    .sort((a, b) => parseInt(b.score) - parseInt(a.score))
                    .map((player, index) => (
                      <div
                        key={`${player.username}-${index}`}
                        className={`flex items-center justify-between p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 ${
                          index === 0
                            ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300'
                            : index === 1
                              ? 'bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-300'
                              : index === 2
                                ? 'bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-300'
                                : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg ${
                              index === 0
                                ? 'bg-yellow-400 text-yellow-800'
                                : index === 1
                                  ? 'bg-gray-400 text-gray-800'
                                  : index === 2
                                    ? 'bg-orange-400 text-orange-800'
                                    : 'bg-blue-400 text-blue-800'
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">
                              {player.username}
                              {player.username === username ? (
                                <span>(Me)</span>
                              ) : null}
                            </h3>
                            {index === 0 && (
                              <Badge className="bg-yellow-200 text-yellow-800 border-yellow-300">
                                🏆 Champion
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-black text-gray-800">
                            {player.score}
                          </div>
                          <div className="text-sm text-gray-600">points</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 rounded-3xl">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Waiting for Others...
                </h3>
                <p className="text-gray-600 text-lg">
                  The room is still in progress. Results will appear when
                  everyone finishes!
                </p>
                <div className="mt-6 flex justify-center">
                  <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
                </div>
                <LiveScores />
              </CardContent>
            </Card>
          )}

          {/* Floating Elements */}
          <div className="absolute top-20 left-20 w-16 h-16 bg-yellow-400/20 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-12 h-12 bg-purple-400/30 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-32 left-40 w-20 h-20 bg-blue-400/20 rounded-full animate-pulse delay-700"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-4">
      {/* Score Header */}
      <div className="text-center mb-8 pt-8">
        <div className="bg-white/20 backdrop-blur-sm rounded-full px-8 py-4 inline-block shadow-lg">
          <p className="text-xl font-bold text-white flex items-center justify-center gap-2">
            <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
            Current Score: {score}
            <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
          </p>
        </div>
      </div>

      {/* Question Container */}
      <div className="flex justify-center">
        {questions?.map((Question) => {
          if (currentQuestion === Question.id) {
            return (
              <QuestionCard
                key={Question.id}
                Question={Question}
                setCurrentQuestion={setCurrentQuestion}
                roomId={roomId}
              />
            );
          }
        })}
        <LiveScores />
      </div>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full animate-float"></div>
        <div className="absolute top-1/4 right-20 w-16 h-16 bg-yellow-400/10 rounded-full animate-float delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-400/10 rounded-full animate-float delay-500"></div>
        <div className="absolute bottom-1/3 right-10 w-12 h-12 bg-blue-400/10 rounded-full animate-float delay-700"></div>
      </div>
    </div>
  );
}
