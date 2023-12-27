import React from "react";

import { ChevronRightEdgeSVG } from "@/assets/chevron-right-edge";

export const GoToWrite = () => {
  return (
    <div className="flex items-center justify-between gap-1 rounded-4 bg-white p-5 hover:cursor-pointer">
      <div>
        <span className="text-b3-compact text-gray-700">
          게시물은 하루에 한개만 작성할 수 있어요
        </span>
        <h3 className="text-h3 text-blue-500">오늘의 게시물 작성하기</h3>
      </div>
      <ChevronRightEdgeSVG />
    </div>
  );
};
