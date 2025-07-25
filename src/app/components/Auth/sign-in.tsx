'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Brain,
  Sparkles,
  Users,
  Trophy,
  Zap,
  ArrowRight,
  Star,
  Target,
  Crown,
  Globe,
  Check,
  X,
  Loader2,

  LogIn,
} from 'lucide-react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useGlobalContext } from '../../providers/GlobalContext';
import { setMyCookie } from '../../actions/cookies';

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

type AuthPageProps = {
  providers: Record<string, Provider> | null;
  csrfToken: string | null;
};

export default function AuthPage({
  providers,
  csrfToken,

}: AuthPageProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [username, setCurrUsername] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<
    'idle' | 'checking' | 'available' | 'taken' | 'error'
  >('idle');
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [usernameTimeoutId, setUsernameTimeoutId] =
    useState<NodeJS.Timeout | null>(null);
  const UsernameInputRef = useRef<HTMLInputElement>(null);

  const { setIsGuest, setUsername, setCookie, setLoggedIn } =
    useGlobalContext();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGoogleSignIn = async (providerId: string) => {
    setIsGoogleLoading(true);
    try {
      setLoggedIn(true);
      await signIn(providerId, {
        redirectTo: `${process.env.NEXT_PUBLIC_FRONTEND_PRODUCTION_URL}/Dashboard`,
      });
      setCookie(true);
    } catch (error) {
      setLoggedIn(false);
      console.error('Google sign-in failed:', error);
      setErrorMessage('Google sign-in failed. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGuestClick = () => {    
    setShowUsernameInput(true);
    setTimeout(() => {
      if (UsernameInputRef.current) {
        UsernameInputRef.current.focus();
      }
    }, 0);
    setErrorMessage('');
    setUsernameStatus('idle');
    setCurrUsername('');
  };

  const checkUsernameAvailability = async (usernameToCheck: string) => {
    if (!usernameToCheck.trim() || usernameToCheck.length < 3) {
      setUsernameStatus('idle');
      return;
    }

    setIsCheckingUsername(true);
    setUsernameStatus('checking');

    try {
      const response = await fetch('/api/check-username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: usernameToCheck.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setUsernameStatus(data.available ? 'available' : 'taken');
        if (!data.available) {
          setErrorMessage('Username is already taken. Please try another one.');
        } else {
          setErrorMessage('');
        }
      } else {
        setUsernameStatus('error');
        setErrorMessage(data.error || 'Error checking username availability');
      }
    } catch (error) {
      setUsernameStatus('error');
      setErrorMessage('Network error. Please try again.' + error);
    } finally {
      setIsCheckingUsername(false);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setCurrUsername(newUsername);

    if (usernameTimeoutId) {
      clearTimeout(usernameTimeoutId);
    }

    if (newUsername.trim().length >= 3) {
      const newTimeoutId = setTimeout(() => {
        checkUsernameAvailability(newUsername);
      }, 1000);
      setUsernameTimeoutId(newTimeoutId);
    } else {
      setUsernameStatus('idle'); // Reset status if username is too short
      setErrorMessage('');
    }
  };

  const createGuestUser = async () => {
    if (usernameStatus !== 'available' || !username.trim()) return;

    setIsCreatingUser(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/create-guest-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        await setMyCookie({
          guestUser: data.user.id,
          guestUsername: data.user.name,
        });
        setUsername(data.user.name);
        setIsGuest(true);
        setCookie(true);
        setLoggedIn(true);
        redirect('/Dashboard');
      } else {
        setErrorMessage(data.error || 'Failed to create guest user.');
        if (data.error === 'Username already taken') {
          setUsernameStatus('taken');
        }
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Network error. Please try again.');
    } finally {
      setIsCreatingUser(false);
      // No need to set setIsGuest and redirect here, already done in the 'if (response.ok)' block
    }
  };

  const getUsernameStatusIcon = () => {
    switch (usernameStatus) {
      case 'checking':
        return <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />;
      case 'available':
        return <Check className="w-5 h-5 text-green-400" />;
      case 'taken':
        return <X className="w-5 h-5 text-red-400" />;
      case 'error':
        return <X className="w-5 h-5 text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0">
        {/* Mouse-following gradient */}
        <div
          className="absolute w-96 h-96 bg-[#A9F99E] rounded-full opacity-20 blur-3xl transition-all duration-1000"
          style={{
            left: mousePosition.x / 8,
            top: mousePosition.y / 8,
          }}
        />

        {/* Static gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#A9F99E] rounded-full opacity-15 blur-2xl animate-pulse" />
        <div
          className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-gradient-to-r from-[#A9F99E] to-[#7DD3FC] rounded-full opacity-10 blur-xl animate-bounce"
          style={{ animationDuration: '4s' }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-32 h-32 bg-purple-500 rounded-full opacity-10 blur-lg animate-pulse"
          style={{ animationDelay: '1s' }}
        />

        {/* Floating geometric shapes */}
        <div
          className="absolute top-20 left-20 w-4 h-4 bg-[#A9F99E] rotate-45 animate-spin"
          style={{ animationDuration: '8s' }}
        />
        <div className="absolute top-40 right-32 w-6 h-6 border-2 border-[#A9F99E] rounded-full animate-ping" />
        <div className="absolute bottom-32 right-20 w-3 h-3 bg-[#A9F99E] animate-pulse" />
        <div className="absolute bottom-40 left-40 w-5 h-5 border-2 border-[#A9F99E] rotate-45 animate-bounce" />
        <div
          className="absolute top-60 left-1/2 w-2 h-2 bg-purple-400 rounded-full animate-ping"
          style={{ animationDelay: '2s' }}
        />

        {/* Floating icons */}
        <div className="absolute top-32 right-1/4 opacity-10 animate-float">
          <Brain className="w-8 h-8 text-[#A9F99E]" />
        </div>
        <div
          className="absolute bottom-1/4 left-1/3 opacity-10 animate-float"
          style={{ animationDelay: '1s' }}
        >
          <Trophy className="w-6 h-6 text-[#A9F99E]" />
        </div>
        <div
          className="absolute top-1/3 left-20 opacity-10 animate-float"
          style={{ animationDelay: '2s' }}
        >
          <Star className="w-5 h-5 text-[#A9F99E]" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-[#A9F99E] to-[#7DD3FC] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Brain className="w-6 h-6 text-black" />
          </div>
          <span className="text-2xl font-bold text-white group-hover:text-[#A9F99E] transition-colors">
            QuizVerse
          </span>
        </Link>

        <Badge className="bg-[#A9F99E]/10 border border-[#A9F99E]/20 text-[#A9F99E] px-4 py-2">
          <div className="w-2 h-2 bg-[#A9F99E] rounded-full mr-2 animate-pulse" />
          Join the Universe
        </Badge>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Branding & Features */}
            <div className="space-y-8">
              {/* Hero Badge */}
              <div className="inline-flex items-center bg-[#A9F99E]/10 border border-[#A9F99E]/20 rounded-full px-6 py-3 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-[#A9F99E] mr-2" />
                <span className="text-[#A9F99E] font-medium">
                  Welcome to the Future
                </span>
                <div className="w-2 h-2 bg-[#A9F99E] rounded-full ml-2 animate-pulse" />
              </div>

              {/* Main Headline */}
              <div>
                <h1 className="text-7xl md:text-6xl font-black text-white mb-6 leading-tight">
                  Enter the
                  <br />
                  <span className="bg-gradient-to-r from-[#A9F99E] to-[#7DD3FC] bg-clip-text text-transparent">
                    QuizVerse
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  Join millions of quiz enthusiasts in the ultimate knowledge
                  battleground. Compete, learn, and dominate across infinite
                  topics.
                </p>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-[#A9F99E]/20 text-[#A9F99E] border-[#A9F99E]/30 hover:bg-[#A9F99E]/30 transition-colors px-4 py-2">
                  <Zap className="w-3 h-3 mr-1" />
                  Real-time Battles
                </Badge>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30 transition-colors px-4 py-2">
                  <Crown className="w-3 h-3 mr-1" />
                  Global Rankings
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30 transition-colors px-4 py-2">
                  <Globe className="w-3 h-3 mr-1" />
                  Infinite Topics
                </Badge>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-4">
                {[
                  { icon: Users, label: 'Active Players', value: '2.5M+' },
                  { icon: Brain, label: 'Quizzes', value: '500K+' },
                  { icon: Trophy, label: 'Competitions', value: '10K+' },
                ].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-12 h-12 bg-[#A9F99E]/10 border border-[#A9F99E]/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-[#A9F99E]/20 transition-all duration-300 group-hover:scale-110">
                      <stat.icon className="w-6 h-6 text-[#A9F99E]" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Auth Card */}
            <div className="flex justify-center lg:justify-end">
              <Card className="w-full max-w-md bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700 backdrop-blur-sm shadow-2xl">
                <CardContent className="p-8">
                  {/* Auth Header */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#A9F99E] to-[#7DD3FC] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Target className="w-8 h-8 text-black" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      Ready to Play?
                    </h2>
                    <p className="text-gray-300">
                      Choose your path to quiz mastery
                    </p>
                  </div>

                  {/* Dynamic Sign-in Options */}
                  <div className="flex flex-col space-y-4">
                    {/* Google Sign-in Button */}
                    {providers && providers.google && (
                      <form
                        action={async () =>
                          await handleGoogleSignIn(providers.google.id)
                        }
                      >
                        <input
                          type="hidden"
                          name="csrfToken"
                          defaultValue={csrfToken || ''}
                        />
                        <Button
                          type="submit"
                          className=" w-full py-6 bg-white hover:bg-gray-100 text-black font-semibold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                          disabled={isGoogleLoading}
                        >
                          {isGoogleLoading ? (
                            <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                          ) : (
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                              <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              />
                              <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              />
                              <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              />
                              <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              />
                            </svg>
                          )}
                          Continue with Google
                        </Button>
                      </form>
                    )}

                    {/* Divider */}
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-600"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-gray-800 text-gray-400">
                          or
                        </span>
                      </div>
                    </div>

                    {/* Guest Sign-in / Username Input */}
                    {!showUsernameInput ? (
                      <Button
                        variant="outline"
                        type="button"
                        onClick={handleGuestClick}
                        className="w-full py-6 border-2 border-[#A9F99E] text-[#A9F99E] hover:bg-[#A9F99E] hover:text-black font-semibold rounded-xl text-lg bg-transparent transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        <Users className="w-5 h-5 mr-3" />
                        Continue as Guest
                      </Button>
                    ) : (
                      <div className="flex flex-col space-y-4">
                        <label htmlFor="guest-username" className="sr-only">
                          Enter Guest Username
                        </label>
                        <div className="relative">
                          <input
                            id="guest-username"
                            type="text"
                            ref={UsernameInputRef}
                            placeholder="Choose a guest username (min 5 chars)"
                            value={username}
                            onChange={handleUsernameChange}
                            className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A9F99E] transition-colors"
                            disabled={isCheckingUsername || isCreatingUser}
                            minLength={5} // Added minLength for better UX
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            {getUsernameStatusIcon()}
                          </div>
                        </div>
                        {errorMessage && (
                          <p className="text-red-400 text-sm">{errorMessage}</p>
                        )}
                        <Button
                          onClick={createGuestUser}
                          className="w-full py-4 bg-[#A9F99E] hover:bg-[#A9F99E]/90 text-black font-semibold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                          disabled={
                            usernameStatus !== 'available' ||
                            !username.trim() ||
                            isCreatingUser ||
                            username.trim().length < 5
                          }
                        >
                          {isCreatingUser ? (
                            <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                          ) : (
                            <LogIn className="w-5 h-5 mr-3" />
                          )}
                          Start as Guest
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Benefits */}
                  <div className="mt-8 pt-6 border-t border-gray-700">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-300">
                        <div className="w-2 h-2 bg-[#A9F99E] rounded-full mr-3" />
                        Instant access to 500K+ quizzes
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <div className="w-2 h-2 bg-[#A9F99E] rounded-full mr-3" />
                        Real-time multiplayer battles
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <div className="w-2 h-2 bg-[#A9F99E] rounded-full mr-3" />
                        Global leaderboards & achievements
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                      By continuing, you agree to our{' '}
                      <Link href="#" className="text-[#A9F99E] hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="#" className="text-[#A9F99E] hover:underline">
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="relative z-10 container mx-auto px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-[#A9F99E]/10 to-[#7DD3FC]/10 border border-[#A9F99E]/20 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Join the Quiz Revolution
                </h3>
                <p className="text-gray-300 mb-6">
                  Experience the most advanced quiz platform ever created
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>2,847 players online now</span>
                  </div>

                  <Button
                    variant="ghost"
                    className="text-[#A9F99E] hover:text-[#A9F99E]/80 hover:bg-[#A9F99E]/10"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
