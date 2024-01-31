import Cookies from "js-cookie";
import create from "zustand";

type Auth = {
  userId: number;
  isLogin: boolean;
};

type Store = {
  auth: Auth;
  setAuth: (userId: number) => void;
};

export const useAuthStore = create<Store>((set) => ({
  auth: {
    userId: Number(Cookies.get("k-u-id")),
    isLogin: Boolean(Cookies.get("k-u-id")),
  },
  setAuth: (userId: number) =>
    set(() => ({
      auth: {
        userId,
        isLogin: !!userId,
      },
    })),
}));
