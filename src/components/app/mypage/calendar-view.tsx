import clsx from "clsx";
import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

import { ChevronLeftEdgeSVG } from "@/assets/icons/chevron-left";
import { ChevronRightEdgeSVG } from "@/assets/icons/chevron-right-edge";
import { useApiClapCalendar } from "@/hooks/api/my-page/useApiClapCalendar";
import { useCalendar } from "@/hooks/useCalendar";
import { useAuthStore } from "@/store/auth";
import { dateUtils } from "@/utils/dateUtils";

type TDate = {
  year: number;
  month: number;
  date: number;
  day: number;
  diff: number; // 현재날짜 기준 달 차이, ex) 2024년 2월 기준, 1월 조회시 diff = 1
};

type TPost = {
  postId: number;
  imageUrl: string;
  postCreatedDate: string;
  date: string;
};

type TCalendarContext = {
  date: TDate;
  setDate: Dispatch<SetStateAction<TDate>>;
  posts: TPost[];
};

type CalendarViewProps = {
  className: string;
  children: ReactNode;
};

export const CalendarContext = createContext<TCalendarContext | undefined>(
  undefined,
);

const Header = () => {
  const { date, setDate } = useCalendar();
  const today = new Date();

  const isRecent =
    today.getFullYear() === date.year && today.getMonth() === date.month;

  const prev = new Date(date.year, date.month - 1);
  const next = new Date(date.year, date.month + 1);

  return (
    <div className="text-num-b1-medium flex h-6 w-full justify-center gap-[30px]">
      <button
        onClick={() =>
          setDate((prevDate) => ({
            ...dateUtils.parseDate(prev),
            diff: prevDate.diff + 1,
          }))
        }
      >
        <ChevronLeftEdgeSVG />
      </button>
      <div>
        {date.year}
        <span className="text-h3">년 </span>
        {(date.month + 1).toString().padStart(2, "0")}
        <span className="text-h3">월</span>
      </div>
      <button
        disabled={isRecent}
        onClick={() =>
          setDate((prevDate) => ({
            ...dateUtils.parseDate(next),
            diff: prevDate.diff - 1,
          }))
        }
        className="disabled:opacity-30"
      >
        <ChevronRightEdgeSVG />
      </button>
    </div>
  );
};

const Cell = ({ day, post }: { day: number; post: TPost[] }) => {
  const navigate = useNavigate();
  const isEmpty = day === 0;
  const hasPost = post.length !== 0;

  return (
    <div
      className={clsx(
        post.length && "!text-num-b2-strong text-oncolor",
        "text-num-b2-compact flex aspect-square w-full items-center justify-center rounded-full bg-cover bg-no-repeat",
      )}
      style={
        hasPost
          ? {
              background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${post[0].imageUrl}), lightgray 50%`,
              backgroundSize: "cover",
            }
          : {}
      }
      onClick={() => {
        if (hasPost)
          navigate("/archive", { state: { postId: post[0].postId } });
      }}
    >
      {isEmpty ? "" : day}
    </div>
  );
};

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

const Grid = () => {
  const {
    date: { year, month, day },
    posts,
  } = useCalendar();
  const [dateList, setDateList] = useState<number[]>([]); // 달력에 표시될 일자 목록
  const lastDateNum = new Date(year, month + 1, 0).getDate();
  console.log(lastDateNum);

  useEffect(() => {
    const emptyDays = Array(day).fill(0) as number[];
    const filledDays = Array(lastDateNum)
      .fill(undefined)
      .map((_, i) => i + 1);
    setDateList([...emptyDays, ...filledDays]);
  }, [year, month]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-around gap-1.5">
        {DAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-x-1.5 gap-y-2.5">
        {dateList.map((date) => (
          <Cell
            key={date + Math.random()}
            day={date}
            post={posts.filter((p) => +p.date === date)}
          />
        ))}
      </div>
    </div>
  );
};

export const CalendarView = ({ className, children }: CalendarViewProps) => {
  const [date, setDate] = useState<TDate>({ ...dateUtils.now(), diff: 0 });
  const { auth } = useAuthStore();
  const { data, fetchNextPage } = useApiClapCalendar(auth.userId);

  useEffect(() => {
    if (!data || data?.pages.length - 1 >= date.diff) return;

    const fetch = async () => {
      await fetchNextPage();
    };
    void fetch();
  }, [date]);

  return (
    <div
      className={clsx(
        "flex flex-col gap-[14px] px-[22px] py-9 tabular-nums",
        className,
      )}
    >
      <CalendarContext.Provider
        value={{
          date,
          setDate,
          posts: data?.pages[date.diff] ?? [],
        }}
      >
        {children}
      </CalendarContext.Provider>
    </div>
  );
};

CalendarView.Header = Header;
CalendarView.Grid = Grid;
