import Cookies from "js-cookie";
import create from "zustand";

type Store = {
  auth: {
    userId: number;
    isLogin: boolean;
  };
  setAuth: (userId: number) => void;
};

export const useAuthStore = create<Store>((set) => ({
  auth: {
    userId: Number(Cookies.get("k-u-id")),
    isLogin: Boolean(Cookies.get("k-u-id")),
  },
  setAuth: (userId: number) =>
    set(() => ({
      userId,
      isLogin: !!userId,
    })),
}));
