'use client';

import React, { useEffect, useState } from 'react';
import { getProviders, getCsrfToken } from 'next-auth/react';
import AuthPage from '../components/Auth/sign-in'; // Adjust path if necessary

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

export default function SignInPage() {
  const [providers, setProviders] = useState<Record<string, Provider> | null>(
    null,
  );
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [loadingProviders, setLoadingProviders] = useState(true);

  const callbackUrl = `https://${process.env.NEXT_PUBLIC_FRONTEND_PRODUCTION_URL}/Dashboard/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProviders = await getProviders();
        const fetchedCsrfToken = await getCsrfToken();
        setProviders(fetchedProviders);
        setCsrfToken(fetchedCsrfToken);
      } catch (error) {
        console.error('Error fetching providers or CSRF token:', error);
      } finally {
        setLoadingProviders(false);
      }
    };
    fetchData();
  }, []);

  if (loadingProviders) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex justify-center items-center">
        <div className="flex flex-col gap-4 p-8 max-w-md mx-auto bg-gradient-to-br from-gray-800/80 to-gray-900/80 shadow-lg rounded-lg mt-10 w-full animate-pulse">
          {/* Skeleton for title */}
          <div className="h-10 bg-gray-700 rounded w-3/4 mx-auto mb-6"></div>{' '}
          {/* Adjusted for dark background */}
          {/* Skeletons for buttons */}
          <div className="h-12 bg-gray-700 rounded-md w-full mb-4"></div>
          <div className="h-12 bg-gray-700 rounded-md w-full"></div>
          <div className="border-t border-gray-600 pt-6 mt-6">
            <div className="h-6 bg-gray-700 rounded w-1/2 mx-auto mb-4"></div>{' '}
            {/* Skeleton for "Or sign in with:" */}
            {/* Skeletons for provider buttons (assuming 2-3 providers) */}
            <div className="h-12 bg-gray-700 rounded-md w-full mb-4"></div>
            <div className="h-12 bg-gray-700 rounded-md w-full"></div>
            <div className="h-12 bg-gray-700 rounded-md w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthPage
      providers={providers}
      csrfToken={csrfToken}
      callbackUrl={callbackUrl}
    />
  );
}
