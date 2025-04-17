
export type UserRole = 'admin' | 'printing' | 'cutting';

export interface User {
  id: string;
  role: UserRole;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  login: (userId: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}
