export interface GuestUser {
  id: string;
  name: string;
  image: string;
  initials: string;
  isGuest: boolean;
  createdAt: string;
}

export interface AuthUser {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  isGuest: boolean;
}
