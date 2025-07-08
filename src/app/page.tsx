'use client';

import React, { useEffect, useState } from 'react';
import { getProviders, getCsrfToken } from 'next-auth/react';
import AuthPage from './components/sign-in'; // Adjust path if necessary
import { useGlobalContext } from './providers/GlobalContext';
import { redirect } from 'next/navigation';

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
  searchParams: { callbackUrl?: string }; // searchParams is an object, no need for Promise.use
}) {
  const { cookie } = useGlobalContext();
  const [providers, setProviders] = useState<Record<string, Provider> | null>(
    null,
  );
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  const callbackUrl = `https://${process.env.NEXT_PUBLIC_FRONTEND_PRODUCTION_URL}/Dashboard/`;

  if (cookie) {
    redirect('/Dashboard');
  }

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
        // no skeleton
      }
    };
    fetchData();
  }, []);

  return (
    <AuthPage
      providers={providers}
      csrfToken={csrfToken}
      callbackUrl={callbackUrl}
    />
  );
}
