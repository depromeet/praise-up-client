import React, { useEffect, useState } from "react";

import { Button } from "./button";
import { RecentCard } from "./recent-card";
import { ShareButton } from "./share-button";

export const ToBeOpen = () => {
  /* 예제 시간 */
  const now = new Date();
  const tomorrow = new Date(now.setDate(now.getDate() + 1));

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-h2 text-gray-900">공계 예정 칭찬게시물</h2>
      <RecentCard keyword={"센스있는"} count={48} openDatetime={tomorrow} />
    </div>
  );
};
