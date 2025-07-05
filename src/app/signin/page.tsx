'use client';

import React, { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { getProviders, getCsrfToken } from 'next-auth/react';
import { SignInAsGuest } from '../components/auth/SignInAsGuest';


const SIGNIN_ERROR_URL = '/error';


interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

export default function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const resolvedSearchParams = React.use(searchParams);

  const [providers, setProviders] = useState<Record<string, Provider> | null>(
    null,
  );
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  const callbackUrl = resolvedSearchParams.callbackUrl ?? '/';

  useEffect(() => {
    const fetchData = async () => {
      const fetchedProviders = await getProviders();
      const fetchedCsrfToken = await getCsrfToken();
      setProviders(fetchedProviders);
      setCsrfToken(fetchedCsrfToken);
    };
    fetchData();
  }, []);

  if (!providers || !csrfToken) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="flex flex-col gap-4 p-8 max-w-md mx-auto bg-white shadow-lg rounded-lg mt-10 w-full animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto mb-6"></div>{' '}
          {/* Skeleton for title */}
          {/* Skeleton for SignInAsGuest */}
          <div className="h-12 bg-gray-200 rounded-md w-full mb-4"></div>
          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>{' '}
            {/* Skeleton for "Or sign in with:" */}
            {/* Skeletons for provider buttons (assuming 2-3 providers) */}
            <div className="h-12 bg-gray-200 rounded-md w-full mb-4"></div>
            <div className="h-12 bg-gray-200 rounded-md w-full mb-4"></div>
            <div className="h-12 bg-gray-200 rounded-md w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-8 max-w-md mx-auto bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>

      <SignInAsGuest callbackUrl={callbackUrl} />

      <div className="border-t border-gray-200 pt-6 mt-6">
        <p className="text-center text-gray-600 mb-4">Or sign in with:</p>
        {Object.values(providers).map((provider) => (
          <form
            key={provider.id}
            action={async () => {
              try {
                await signIn(provider.id, {
                  callbackUrl: callbackUrl,
                });
              } catch (error: any) {
                console.error('Sign-in error:', error);
              }
            }}
            className="mb-4"
          >
            <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <span>Sign in with {provider.name}</span>
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
