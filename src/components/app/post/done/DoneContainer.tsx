import { Fragment } from "react";

import Icon from "@/assets/images/done.svg?react";
import Confetti from "@/hooks/useConfetti";

export const DoneContainer = () => {
  return (
    <Fragment>
      <Confetti />
      <div className="absolute left-1/2 top-1/2 flex h-[400px] w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-transparent">
        <Icon width="307" height="272" />
      </div>
    </Fragment>
  );
};
