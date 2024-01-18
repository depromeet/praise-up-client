import { create } from "zustand";
import { persist } from "zustand/middleware";

type userProps = {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
};

const useUserStore = create(
  persist<userProps>(
    (set) => ({
      isLogin: false,
      setIsLogin: (isLogin) => {
        set({ isLogin: isLogin });
      },
    }),
    {
      name: "userLoginStorage",
    },
  ),
);

export default useUserStore;
