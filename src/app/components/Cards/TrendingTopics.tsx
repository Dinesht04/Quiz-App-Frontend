import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Crown, Rocket, Star, TrendingUp } from 'lucide-react';

export default function TrendingTopics() {
  const popularTopics = [
    {
      name: 'Space Exploration',
      count: '2.4k',
      trend: '+12%',
      color: 'from-purple-500 to-pink-500',
      icon: Rocket,
    },
    {
      name: 'Ancient History',
      count: '1.8k',
      trend: '+8%',
      color: 'from-amber-500 to-orange-500',
      icon: Crown,
    },
    {
      name: 'Modern Science',
      count: '1.5k',
      trend: '+15%',
      color: 'from-cyan-500 to-blue-500',
      icon: Brain,
    },
    {
      name: 'Pop Culture',
      count: '1.2k',
      trend: '+5%',
      color: 'from-green-500 to-emerald-500',
      icon: Star,
    },
  ];
  return (
    <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700/50 backdrop-blur-sm shadow-2xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-pink-500/25">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <span>Trending Arenas</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {popularTopics.map((topic, index) => (
          <div
            key={index}
            className="group relative p-4 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-gray-600/50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 bg-gradient-to-br ${topic.color} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <topic.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">
                    {topic.name}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {topic.count} active battles
                  </p>
                </div>
              </div>
              <Badge

                variant="outline"
                className="border-[#A9F99E]/30 text-[#A9F99E] bg-[#A9F99E]/10 font-semibold"
              >
                {topic.trend}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
