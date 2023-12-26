import React from "react";

import marble from "@/assets/marble.png";

type CountBadgeType = {
  count: number;
};

const CountBadge = (props: CountBadgeType) => {
  return (
    <div className="rounded-2 flex w-fit items-center gap-[4px] bg-[#ffffffcc] px-[8px] py-[6px]">
      <img src={marble} className="h-[16px] w-[16px]" />
      <div className="text-gray-800">
        <span className="text-b3-strong">{props.count}</span>
        <span className="text-b3-compact">개</span>
      </div>
    </div>
  );
};

export default CountBadge;
