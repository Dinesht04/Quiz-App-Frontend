
import { useQuizContext } from "@/app/providers/QuizContext";
import { Trophy, Flag, Users, Crown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LiveScores() {
  const { liveScore } = useQuizContext();

  const players = liveScore?.map(([username, questionsAnswered]) => ({
    username,
    questionsAnswered: Number(questionsAnswered),
  })) || [];

  // Sort players by progress (descending)
  const sortedPlayers = [...players].sort((a, b) => b.questionsAnswered - a.questionsAnswered);

  // Generate vibrant colors for each player
  const getPlayerColor = (index: number) => {
    const colors = [
      'bg-gradient-to-r from-purple-500 to-pink-500',
      'bg-gradient-to-r from-blue-500 to-cyan-500',
      'bg-gradient-to-r from-green-500 to-teal-500',
      'bg-gradient-to-r from-orange-500 to-red-500',
      'bg-gradient-to-r from-indigo-500 to-purple-500',
      'bg-gradient-to-r from-yellow-500 to-orange-500',
    ];
    return colors[index % colors.length];
  };

  const getPlayerPosition = (questionsAnswered: number) => {
    // Calculate position along the path (0-100%)
    return Math.min((questionsAnswered / 5) * 100, 100);
  };

  if (!players.length) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 rounded-2xl">
        <CardContent className="p-8 text-center">
          <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 text-lg">Waiting for quiz to start...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white py-6">
        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-3">
          <Trophy className="w-7 h-7 text-yellow-300" />
          Live Race Progress
          <Trophy className="w-7 h-7 text-yellow-300" />
        </CardTitle>
      </CardHeader>

      <CardContent className="p-8">
        {/* Race Track */}
        <div className="relative mb-8">
          {/* Track Background */}
          <div className="relative h-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full shadow-inner border-4 border-gray-300 overflow-hidden">
            {/* Animated background stripes */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>

            {/* Milestone markers */}
            {[1, 2, 3, 4, 5].map((milestone) => (
              <div
                key={milestone}
                className="absolute top-0 bottom-0 flex items-center justify-center"
                style={{ left: `${(milestone / 5) * 100}%`, transform: 'translateX(-50%)' }}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">{milestone}</span>
                </div>
              </div>
            ))}

            {/* Finish Line */}
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
              <Flag className="w-6 h-6 text-white" />
            </div>

            {/* Player Bubbles */}
            {sortedPlayers.map((player, index) => (
              <div
                key={player.username}
                className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-1000 ease-out"
                style={{
                  left: `${getPlayerPosition(player.questionsAnswered)}%`,
                  transform: 'translateY(-50%) translateX(-50%)',
                  zIndex: 10 - index,
                }}
              >
                <div className={`relative w-12 h-12 ${getPlayerColor(index)} rounded-full border-4 border-white shadow-xl animate-bounce`}>
                  <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                  <div className="absolute inset-2 bg-white/30 rounded-full"></div>

                  {/* Crown for leader */}
                  {index === 0 && player.questionsAnswered > 0 && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <Crown className="w-6 h-6 text-yellow-400 animate-pulse" />
                    </div>
                  )}

                  {/* Player initial */}
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                    {player.username.charAt(0).toUpperCase()}
                  </div>
                </div>

                {/* Player name tooltip */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                    {player.username}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-500" />
            Current Standings
          </h3>

          {sortedPlayers.map((player, index) => (
            <div
              key={player.username}
              className={`flex items-center justify-between p-4 rounded-2xl shadow-md transform hover:scale-102 transition-all duration-200 ${
                index === 0
                  ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300'
                  : 'bg-gradient-to-r from-gray-50 to-white border border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 ${getPlayerColor(index)} rounded-full border-2 border-white shadow-lg flex items-center justify-center`}>
                  <span className="text-white font-bold">
                    {player.username.charAt(0).toUpperCase()}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 flex items-center gap-2">
                    {player.username}
                    {index === 0 && player.questionsAnswered > 0 && (
                      <Crown className="w-4 h-4 text-yellow-500" />
                    )}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {player.questionsAnswered} / 5 questions completed
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-black text-gray-800">
                  #{index + 1}
                </div>
                <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${getPlayerColor(index)}`}
                    style={{ width: `${(player.questionsAnswered / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Floating decoration elements */}
      <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-30 animate-bounce delay-500"></div>
    </Card>
  );
}
