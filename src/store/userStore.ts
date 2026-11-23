import { create } from 'zustand';

/**
 * 用户信息
 */
export interface User {
  id: string;
  name: string;
  avatar: string;
}

/**
 * 用户 Store 的状态 + 动作定义
 */
export interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));
