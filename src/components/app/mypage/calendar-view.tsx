import clsx from "clsx";
import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  ReactNode,
} from "react";

import { ChevronLeftEdgeSVG } from "@/assets/icons/chevron-left";
import { ChevronRightEdgeSVG } from "@/assets/icons/chevron-right-edge";
import { useCalendar } from "@/hooks/useCalendar";
import { dateUtils } from "@/utils/dateUtils";

type TDate = {
  year: number;
  month: number;
  date: number;
  day: number;
};

// temp post type
type TPost = {
  id: number;
  imageUrl: string;
  postCreatedDate: string;
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

const DUMMY_DATA: TPost[] = [
  { id: 1, imageUrl: "", postCreatedDate: "2024-02-02" },
  { id: 2, imageUrl: "", postCreatedDate: "2024-02-10" },
];

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
      <button onClick={() => setDate(dateUtils.parseDate(prev))}>
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
        onClick={() => setDate(dateUtils.parseDate(next))}
        className=" disabled:opacity-30"
      >
        <ChevronRightEdgeSVG />
      </button>
    </div>
  );
};

const Cell = ({ day }: { day: number }) => {
  const isEmpty = day === 0;
  const isTestDay = day === 7 || day === 10; // test day
  return (
    <div
      className={clsx(
        isTestDay && "!text-num-b2-strong text-oncolor",
        "text-num-b2-compact flex aspect-square w-full items-center justify-center rounded-full bg-cover bg-no-repeat",
      )}
      style={
        isTestDay
          ? {
              background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(https://pbs.twimg.com/media/EFHWmyXUEAASe0o.jpg), lightgray 50%`,
              backgroundSize: "cover",
            }
          : {}
      }
    >
      {isEmpty ? "" : day}
    </div>
  );
};

const Grid = () => {
  const {
    date: { year, month, day },
  } = useCalendar();
  const [dateList, setDateList] = useState<number[]>([]);
  const lastDateNum = new Date(year, month - 1, 0).getDate();

  useEffect(() => {
    const emptyDays = day > 0 ? (Array(day - 1).fill(0) as number[]) : [];
    const days = Array(lastDateNum)
      .fill(undefined)
      .map((_, i) => i + 1);
    setDateList([...emptyDays, ...days]);
  }, [year, month, day, lastDateNum]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-around gap-1.5">
        <span>일</span>
        <span>월</span>
        <span>화</span>
        <span>수</span>
        <span>목</span>
        <span>금</span>
        <span>토</span>
      </div>
      <div className="grid grid-cols-7 gap-x-1.5 gap-y-2.5">
        {dateList.map((i) => (
          <Cell key={i + Math.random()} day={i} />
        ))}
      </div>
    </div>
  );
};

export const CalendarView = ({ className, children }: CalendarViewProps) => {
  const [date, setDate] = useState<TDate>(dateUtils.now());

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
          posts: DUMMY_DATA,
        }}
      >
        {children}
      </CalendarContext.Provider>
    </div>
  );
};

CalendarView.Header = Header;
CalendarView.Grid = Grid;
