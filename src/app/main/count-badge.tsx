import React from "react";

import { MarbleSVG } from "@/assets/marble";

type CountBadgeType = {
  count: number;
};

export const CountBadge = (props: CountBadgeType) => {
  return (
    <div className="flex w-fit items-center gap-1 rounded-2 bg-[#ffffffcc] px-2 py-1.5  backdrop-blur-[10px]">
      <MarbleSVG />
      <div className="text-gray-800">
        <span className="text-num-b3-strong">{props.count}</span>
        <span className="text-b3-compact">개</span>
      </div>
    </div>
  );
};
