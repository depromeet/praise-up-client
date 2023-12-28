import React, { useEffect, useState } from "react";

import { RecentCard } from "./recent-card";

export const ToBeOpen = () => {
  /* 예제 시간 */
  const now = new Date();
  const testBefore = new Date(now.setDate(now.getDate() - 1)).toISOString();
  const testAfter = new Date(now.setDate(now.getDate() + 2)).toISOString();

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-h2 text-gray-900">공계 예정 칭찬게시물</h2>
      <RecentCard keyword={"센스있는"} count={48} openDatetime={testAfter} />
    </div>
  );
};
