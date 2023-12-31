import React, { useEffect, useState } from "react";

import { RecentCard } from "./recent-card";

import { Carousel } from "@/components/common/carousel";

export const ToBeOpen = () => {
  /* 예제 시간 */
  const now = new Date();
  const testBefore = new Date(now.setDate(now.getDate() - 1)).toISOString();
  const testAfter = new Date(now.setDate(now.getDate() + 2)).toISOString();

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-h2 text-gray-900">공계 예정 칭찬게시물</h2>
      <Carousel>
        <RecentCard keyword="신나는" count={48} openDatetime={testBefore} />
        <RecentCard keyword="재미있는" count={12} openDatetime={testAfter} />
      </Carousel>
    </div>
  );
};
