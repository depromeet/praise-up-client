import { Fragment } from "react";

import Icon from "@/assets/images/done.svg?react";
import Confetti from "@/hooks/useConfetti";

export const DoneContainer = () => {
  return (
    <Fragment>
      <Confetti />
      <div className="relative w-full bg-transparent pb-[100%]">
        <Icon className="absolute h-full w-full" width="307" height="272" />
      </div>
    </Fragment>
  );
};
