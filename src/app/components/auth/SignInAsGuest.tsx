'use client';

import { Button } from '@/components/ui/button';
import { useGlobalContext } from '@/app/providers/GlobalContext';
import { getGuestExpires, guestUsernameGenerator } from '@/lib/GuestLogin';
import { redirect } from 'next/navigation';
import { LogIn } from 'lucide-react';

type SignInAsGuestProps = {
  callbackUrl: string;
};

export function SignInAsGuest({ callbackUrl }: SignInAsGuestProps) {
  const { setUsername, setExpires, setIsGuest } = useGlobalContext();

  return (
    <form
      action={async () => {
        setUsername(guestUsernameGenerator());
        setExpires(getGuestExpires());
        setIsGuest(true);
        redirect('http://localhost:3000/');
      }}
    >
      <Button
        type="submit"
        variant="outline"
        size="lg"
        className="border-2 border-gray-300 hover:border-red-400 hover:bg-red-50 text-gray-700 hover:text-red-600 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium"
      >
        <LogIn className="w-5 h-5 mr-2" />
        Continue as Guest
      </Button>
    </form>
  );
}
