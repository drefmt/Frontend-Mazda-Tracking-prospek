import { create } from "zustand";

type User = {
  id: string;
  username: string;
  level: "sales" | "svp";  
} | null;

type AuthStore = {
  user: User;
  token: string | null;
  setUser: (user: User, token: string) => void;
  logout: () => void;
};

// Fungsi untuk mengambil user dari SessionStorage saat aplikasi dimulai
const getUserFromStorage = (): User => {
  const username = sessionStorage.getItem("username");
  const userId = sessionStorage.getItem("userId");
  const level = sessionStorage.getItem("level") as "sales" | "svp" | null;

  if (userId && level && username) {
    return { id: userId, level, username };
  }
  return null;
};

// Fungsi untuk mengambil token dari SessionStorage
export const getToken = (): string | null => {
  return sessionStorage.getItem("token");
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: getUserFromStorage(),
  token: getToken(),

  setUser: (user, token) => {
    if (user && token) {
      sessionStorage.clear();
      sessionStorage.setItem("username", user.username);
      sessionStorage.setItem("userId", user.id);
      sessionStorage.setItem("level", user.level);
      sessionStorage.setItem("token", token);
      set({ user, token });
    }
  },
  
  logout: () => {
    sessionStorage.clear();
    set({ user: null, token: null });
  },
}));

export const handleLoginResponse = (response: { message: string; username: string; token: string; user: { id: string; level: "sales" | "svp"; username: string } }) => {
  const { username, user, token } = response;
  const userData = { id: user.id, level: user.level, username };
  useAuthStore.getState().setUser(userData, token);
};
