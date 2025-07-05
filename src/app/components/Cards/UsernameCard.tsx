'use client';
import { useGlobalContext } from '@/app/providers/GlobalContext';

export default function UsernameCard() {
  const { username } = useGlobalContext();

  return (
    <div>
      {username && (
        <div className="px-8 pb-2">
          <div className="text-center text-sm text-gray-500">
            Playing as:{' '}
            <span className="font-medium text-blue-600">{username}</span>
          </div>
        </div>
      )}
    </div>
  );
}
