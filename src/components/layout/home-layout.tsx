import { PropsWithChildren } from "react";

import { UserSVG } from "@/assets/icons/user";
import { Appbar } from "@/components/common/appbar";

export const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className=" relative left-1/2 top-1/2 h-full w-full max-w-[480px] -translate-x-1/2 select-none overflow-x-auto scroll-smooth border-x bg-gray-100 scrollbar-hide">
      <Appbar right={<UserSVG />} />
      <div className="px-20px pt-16px">{children}</div>
    </div>
  );
};
