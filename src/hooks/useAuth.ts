import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  lineId: string;
  role: 'admin' | 'user';
}

interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
  users: User[];
  login: (password: string, name: string) => Promise<void>;
  logout: () => void;
  addUser: (name: string, lineId: string) => string;
  removeUser: (id: string) => void;
}

const ADMIN_PASSWORD = '123456789012';

const generatePassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 12 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
};

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      currentUser: null,
      users: [],
      login: async (password: string, name: string) => {
        if (password === ADMIN_PASSWORD) {
          set({ 
            isAuthenticated: true, 
            currentUser: { id: 'admin', name: 'Administrator', lineId: '', role: 'admin' }
          });
        } else {
          const user = get().users.find(u => u.id === password && u.name === name);
          if (!user) {
            throw new Error('Invalid credentials');
          }
          set({ isAuthenticated: true, currentUser: user });
        }
      },
      logout: () => {
        set({ isAuthenticated: false, currentUser: null });
      },
      addUser: (name: string, lineId: string) => {
        const password = generatePassword();
        const newUser = { id: password, name, lineId, role: 'user' as const };
        set(state => ({ users: [...state.users, newUser] }));
        return password;
      },
      removeUser: (id: string) => {
        set(state => ({ users: state.users.filter(user => user.id !== id) }));
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ users: state.users })
    }
  )
);