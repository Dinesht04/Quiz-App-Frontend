'use client';

import React, { useEffect, useState } from 'react';
import { getProviders, getCsrfToken } from 'next-auth/react';
import AuthPage from './components/Auth/sign-in'; // Adjust path if necessary
import { useGlobalContext } from './providers/GlobalContext';
import { redirect } from 'next/navigation';

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

export default function SignInPage() {
  const { cookie, setLoggedIn } = useGlobalContext();
  const [providers, setProviders] = useState<Record<string, Provider> | null>(
    null,
  );
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  useEffect(() => {
    if (cookie) {
      setLoggedIn(true);
      redirect('/Dashboard');
    }
  }, [cookie]);

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
    />
  );
}
