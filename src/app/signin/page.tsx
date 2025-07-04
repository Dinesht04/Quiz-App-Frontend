import { redirect } from 'next/navigation';
import { signIn, providerMap } from '@/lib/auth';
import { AuthError } from 'next-auth';
import { SignInAsGuest } from '../components/auth/SignInAsGuest';

const SIGNIN_ERROR_URL = '/error';

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const callbackUrl = (await searchParams).callbackUrl ?? '';

  return (
    <div className="flex flex-col gap-2">
      <SignInAsGuest callbackUrl={callbackUrl} />

      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.id}
          action={async () => {
            'use server';
            try {
              await signIn(provider.id, {
                redirectTo: callbackUrl,
              });
            } catch (error) {
              if (error instanceof AuthError) {
                return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
              }
              throw error;
            }
          }}
        >
          <button type="submit">
            <span>Sign in with {provider.name}</span>
          </button>
        </form>
      ))}
    </div>
  );
}
