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

export const useAuthStore = create<Store>((set) => {
  const userId = Number(Cookies.get("k-u-id") || 0);

  return {
    auth: {
      userId,
      isLogin: Boolean(userId),
    },
    setAuth: (userId: number) =>
      set(() => ({
        auth: {
          userId,
          isLogin: Boolean(userId),
        },
      })),
  };
});
