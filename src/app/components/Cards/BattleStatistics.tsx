import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Trophy } from 'lucide-react';

export default function BattleStatistics() {
  const userStats = {
    gamesPlayed: 47,
    winRate: 73,
    totalPoints: 12450,
    rank: 'Quiz Master',
    streak: 8,
    level: 12,
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700/50 backdrop-blur-sm shadow-2xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center shadow-lg shadow-yellow-500/25">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <span>Battle Stats</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-4 bg-gradient-to-br from-[#A9F99E]/20 to-cyan-400/20 rounded-xl border border-[#A9F99E]/30">
            <p className="text-2xl font-bold text-[#A9F99E]">
              {userStats.gamesPlayed}
            </p>
            <p className="text-xs text-gray-400">Battles</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-xl border border-cyan-400/30">
            <p className="text-2xl font-bold text-cyan-400">
              {userStats.winRate}%
            </p>
            <p className="text-xs text-gray-400">Win Rate</p>
          </div>
        </div>
        <div className="text-center p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
          <p className="text-3xl font-bold text-white">
            {userStats.totalPoints.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 flex items-center justify-center">
            <Award className="w-3 h-3 mr-1" />
            Total XP
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
