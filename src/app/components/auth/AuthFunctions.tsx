import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react';
import { signInAction, signOutAction } from '@/app/actions/auth';

export function SignIn() {
  return (
    <form action={signInAction}>
      <Button
        type="submit"
        size="lg"
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
      >
        <LogIn className="w-5 h-5 mr-2" />
        Sign In
      </Button>
    </form>
  );
}

export function SignOut() {
  return (
    <form action={signOutAction}>
      <Button
        type="submit"
        variant="outline"
        size="lg"
        className="border-2 border-gray-300 hover:border-red-400 hover:bg-red-50 text-gray-700 hover:text-red-600 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium"
      >
        <LogOut className="w-5 h-5 mr-2" />
        Sign Out
      </Button>
    </form>
  );
}
