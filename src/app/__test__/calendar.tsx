import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  Heading,
} from "react-aria-components";

import { ChevronLeftEdgeSVG } from "@/assets/icons/chevron-left";
import { ChevronRightEdgeSVG } from "@/assets/icons/chevron-right-edge";
import { DefaultLayout } from "@/components/layout/default";

export const Test = () => {
  return (
    <DefaultLayout className="bg-gray-600" noXPadding>
      <div className="mt-auto">
        <div className="bg-white pb-56px">
          <CalendarComp />
        </div>
      </div>
    </DefaultLayout>
  );
};

const CalendarComp = () => {
  return (
    <Calendar
      className="px-[22px] py-9 font-work-sans"
      aria-label="Appointment date"
    >
      <header className="flex">
        <Button slot="previous">
          <ChevronLeftEdgeSVG />
        </Button>
        <Heading />
        <Button slot="next">
          <ChevronRightEdgeSVG />
        </Button>
      </header>
      <CalendarGrid className="aspect-square w-full">
        {(date) => <CalendarCell date={date} />}
      </CalendarGrid>
    </Calendar>
  );
};
