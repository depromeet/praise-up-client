import { PropsWithChildren } from "react";

import BackgroundGradient from "@/assets/imgs/background_gradient.svg?react";

export const LayeredBackground = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="absolute left-0 top-0 -z-10 h-full w-full overflow-hidden">
        <BackgroundGradient className="h-full w-full blur-[50px]" />
      </div>
      <div className="flex h-full w-full flex-1 flex-col gap-9 pb-[60px]">
        {children}
      </div>
    </>
  );
};
