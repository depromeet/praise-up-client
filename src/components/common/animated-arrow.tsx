import Arrow1 from "@/assets/icons/arrow1.svg?react";
import Arrow2 from "@/assets/icons/arrow2.svg?react";
import Arrow3 from "@/assets/icons/arrow3.svg?react";

export const AnimatedArrow = () => (
  <div className="relative">
    <div className="h-[34px] w-[38px]"></div>
    <Arrow1 className=" absolute left-1/2 top-0 -translate-x-1/2 animate-[arrowBlink_0.9s_infinite_0s] " />
    <Arrow2 className="absolute left-1/2 top-0 -translate-x-1/2 animate-[arrowBlink_0.9s_infinite_0.3s]" />
    <Arrow3 className="absolute left-1/2 top-0 -translate-x-1/2 animate-[arrowBlink_0.9s_infinite_0.6s]" />
  </div>
);
