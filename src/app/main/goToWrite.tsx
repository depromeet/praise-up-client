import React from "react";

import chevronRight from "@/assets/chevron_right_edge.png";

const GoToWrite = () => {
  return (
    <div className="rounded-4 flex items-center justify-between gap-[4px] bg-white p-[20px] hover:cursor-pointer">
      <div>
        <span className="text-gray-700">
          게시물은 하루에 한개만 작성할 수 있어요
        </span>
        <h3 className="text-h3 text-blue-500">오늘의 게시물 작성하기</h3>
      </div>
      <img src={chevronRight} className="h-[24px] w-[24px]" />
    </div>
  );
};

export default GoToWrite;
