import { PropsWithChildren } from "react";

import { LogoSVG } from "@/assets/icons/logo";
import { UserSVG } from "@/assets/icons/user";

export const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className=" relative left-1/2 top-1/2 h-full w-full max-w-[480px] -translate-x-1/2 select-none overflow-auto scroll-smooth border-x bg-gray-100 scrollbar-hide">
      <div className="px-20px pt-16px">
        {/* 임시 앱바 */}
        <div className="flex h-64px justify-between px-5 py-2.5">
          <LogoSVG />
          <UserSVG />
        </div>
        {children}
      </div>
    </div>
  );
};
