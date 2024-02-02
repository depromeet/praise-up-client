import { useNavigate } from "react-router-dom";

import { ChevronLeftEdgeSVG } from "@/assets/icons/chevron-left";
import MarbleSVG from "@/assets/icons/marble_small_filled.svg";
import PostSVG from "@/assets/icons/post.svg";
import { CalendarView } from "@/components/app/mypage/calendar-view";
import { StatsCard } from "@/components/app/mypage/stats-card";
import { Appbar } from "@/components/common/appbar";
import { DefaultLayout } from "@/components/layout/default";

export const CalendarPage = () => {
  const navigate = useNavigate();
  return (
    <DefaultLayout
      className=" bg-gray-100"
      appbar={
        <Appbar
          left={
            <button onClick={() => navigate(-1)}>
              <ChevronLeftEdgeSVG />
            </button>
          }
        />
      }
    >
      <div className="mb-7 flex flex-col gap-9">
        <h2 className="text-h2">나의 칭찬 모아보기</h2>
        <div className="flex gap-2">
          <StatsCard title="칭찬 활동수" count={0} imageUrl={PostSVG} />
          <StatsCard title="받은 칭찬 구슬" count={99} imageUrl={MarbleSVG} />
        </div>
      </div>

      <CalendarView className="mx-[-22px] flex-1 bg-oncolor">
        <CalendarView.Header />
        <CalendarView.Grid />
      </CalendarView>
    </DefaultLayout>
  );
};
