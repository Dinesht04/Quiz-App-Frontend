import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useQuizContext } from '@/app/providers/QuizContext';
import { Trophy, Zap, Brain } from 'lucide-react';

export default function QuizStartTimer() {
  const { setQuizStarted } = useQuizContext();
  const [seconds, setSeconds] = useState(4);

  useEffect(() => {
    if (seconds <= 0) {
      setQuizStarted(true);
      redirect('/Quiz');
    }

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const getCountdownText = () => {
    switch (seconds) {
      case 3:
        return 'Get Ready!';
      case 2:
        return 'Set!';
      case 1:
        return 'GO!';
      default:
        return 'Quiz Starting...';
    }
  };

  const getIcon = () => {
    switch (seconds) {
      case 3:
        return <Brain className="w-16 h-16 text-white animate-pulse" />;
      case 2:
        return <Zap className="w-16 h-16 text-white animate-bounce" />;
      case 1:
        return <Trophy className="w-16 h-16 text-white animate-spin" />;
      default:
        return <Brain className="w-16 h-16 text-white" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-32 w-12 h-12 bg-yellow-400/20 rounded-full animate-bounce delay-300"></div>
      <div className="absolute bottom-32 left-40 w-16 h-16 bg-pink-400/15 rounded-full animate-pulse delay-700"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-green-400/10 rounded-full animate-bounce delay-1000"></div>

      {/* Main Content */}
      <div className="text-center space-y-8 z-10">
        {/* Icon */}
        <div className="flex justify-center">{getIcon()}</div>

        {/* Countdown Number */}
        <div className="relative">
          <div
            className={`text-9xl font-black text-white transform transition-all duration-500 ${
              seconds <= 3 ? 'animate-pulse scale-110' : 'scale-100'
            }`}
            style={{
              textShadow:
                '0 0 50px rgba(255,255,255,0.3), 0 0 100px rgba(255,255,255,0.2)',
            }}
          >
            {seconds > 0 ? seconds : '🚀'}
          </div>

          {/* Pulsing Ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 border-4 border-white/30 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white animate-fade-in">
            {getCountdownText()}
          </h1>
          <p className="text-xl text-white/80 animate-fade-in delay-300">
            {seconds > 0
              ? 'Prepare yourself for an epic quiz battle!'
              : "Let's go!"}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto bg-white/20 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${((4 - seconds) / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
