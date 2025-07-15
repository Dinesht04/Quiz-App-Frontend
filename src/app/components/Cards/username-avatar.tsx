'use client';

interface UsernameAvatarProps {
  username: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function UsernameAvatar({
  username,
  size = 'md',
  className = '',
}: UsernameAvatarProps) {
  const generateInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-xl',
  };

  return (
    <div
      className={`bg-gradient-to-br from-[#A9F99E] to-[#7DD3FC] rounded-full flex items-center justify-center shadow-lg font-bold text-black ${sizeClasses[size]} ${className}`}
    >
      {generateInitials(username)}
    </div>
  );
}
