'use client';

import { Button } from '@/components/ui/button';
import { Crown, Flame, LogOut } from 'lucide-react';
import { useGlobalContext } from '../../providers/GlobalContext';
import { Badge } from '@/components/ui/badge';
import { signOutAction } from '../../actions/auth';
import { deleteMyCookies } from '../../actions/cookies';
import { Session } from 'next-auth';

export default function Statistics({ session }: {session : Session | null}) {
  const userStats = {
    gamesPlayed: 47,
    winRate: 73,
    totalPoints: 12450,
    rank: 'Quiz Master',
    streak: 8,
    level: 12,
  };

  const { username, isGuest, setIsGuest, setCookie, setUsername, setLoggedIn } =
    useGlobalContext();

  async function handleLogOut(isGuest: boolean) {
    if (isGuest) {
      await deleteMyCookies();
      setIsGuest(false);
      setUsername(null);
    } else {
      signOutAction();
    }
    setCookie(false);
    setLoggedIn(false);
  }

  return (
    <>
      <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-[#A9F99E]/20 to-cyan-400/20 rounded-full border border-[#A9F99E]/30">
        <Flame className="w-4 h-4 text-orange-400" />
        <span className="text-sm font-medium text-white">
          {userStats.streak} day streak
        </span>
      </div>

      <Badge
        variant="outline"
        className="border-[#A9F99E]/30 text-[#A9F99E] bg-[#A9F99E]/10 px-3 py-1"
      >
        <Crown className="w-3 h-3 mr-1" />
        Level {userStats.level}
      </Badge>

      <div>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 w-fit hover:cursor-pointer px-2 hover:text-white hover:bg-white/10"
          onClick={() => handleLogOut(isGuest)}
        >
          <span>{isGuest ? username : session?.user?.name} </span>
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </>
  );
}
