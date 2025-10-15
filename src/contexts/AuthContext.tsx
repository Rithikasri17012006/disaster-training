import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { mockUsers, mockCredentials } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, id?: string) => Promise<boolean>;
  signup: (name: string, email: string, phone: string, password: string, role: UserRole, id?: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, id?: string): Promise<boolean> => {
    const foundUser = mockUsers.find(u => u.email === email);

    if (!foundUser) return false;

    const credentials = Object.values(mockCredentials).find(c => c.email === email);
    if (!credentials || credentials.password !== password) return false;

    if ((foundUser.role === 'admin' || foundUser.role === 'ngo') && credentials.id) {
      if (id !== credentials.id) return false;
    }

    setUser(foundUser);
    localStorage.setItem('currentUser', JSON.stringify(foundUser));
    return true;
  };

  const signup = async (
    name: string,
    email: string,
    phone: string,
    password: string,
    role: UserRole,
    organizationId?: string
  ): Promise<boolean> => {
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) return false;

    const newUser: User = {
      id: `?{role.toUpperCase().substring(0, 3)}?{Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      name,
      email,
      phone,
      role,
      organizationId,
    };

    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
