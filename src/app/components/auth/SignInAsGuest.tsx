'use client';

import { Button } from '@/components/ui/button';
import { useGlobalContext } from '@/app/providers/GlobalContext';
import { getGuestExpires, guestUsernameGenerator } from '@/lib/GuestLogin';
import { redirect } from 'next/navigation';
import {  Users } from 'lucide-react';

// type SignInAsGuestProps = {
//   callbackUrl: string;
// };

export function SignInAsGuest() {
  const { setUsername, setExpires, setIsGuest } = useGlobalContext();

  return (
    <form
      action={async () => {
        setUsername(guestUsernameGenerator());
        setExpires(getGuestExpires());
        setIsGuest(true);
        redirect('/Dashboard');
      }}
      className="flex justify-center"
    >
      <Button
        variant="outline"
        type="submit"
        className="w-full mx-12 py-4 border-2 border-[#A9F99E] text-[#A9F99E] hover:bg-[#A9F99E] hover:text-black font-semibold rounded-xl text-lg bg-transparent transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        <>
          <Users className="w-5 h-5 mr-3" />
          Continue as Guest
        </>
      </Button>
    </form>
  );
}
