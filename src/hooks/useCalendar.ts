import { useContext } from "react";

import { CalendarContext } from "@/components/app/mypage/calendar-view";

export function useCalendar() {
  const context = useContext(CalendarContext || undefined);
  if (context === undefined)
    throw new Error("useCalendar must be used within a <Calendar />");
  return context;
}
