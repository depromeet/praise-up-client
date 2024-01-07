import { PropsWithChildren } from "react";

import bg_circles from "@/assets/imgs/bg_circles.svg";

export const LayeredBackground = ({ children }: PropsWithChildren) => {
  return (
    <div className="overflow-hidden">
      <div
        className="absolute left-0 h-full w-full overflow-hidden blur-[50px] after:absolute after:left-0 after:h-full after:w-full after:bg-white after:opacity-75"
        style={{
          backgroundImage: `url(${bg_circles})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPositionY: "88px",
          backgroundAttachment: "scroll",
        }}
      ></div>

      <div className="relative flex h-full w-full flex-col gap-9 pb-[60px]">
        {children}
      </div>
    </div>
  );
};
