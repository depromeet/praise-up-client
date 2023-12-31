import clsx from "clsx";
import { PropsWithChildren, ReactNode } from "react";

type Props = {
  isMain?: boolean;
  appbar?: ReactNode;
} & PropsWithChildren;

export const DefaultLayout = ({ isMain = false, appbar, children }: Props) => {
  return (
    <div
      className={clsx(
        { "bg-gray-100 overflow-auto scrollbar-hide": isMain },
        "absolute left-1/2 top-1/2 h-full w-full max-w-[480px] -translate-x-1/2 -translate-y-1/2 border-x ",
      )}
    >
      {/* need app bar variants */}
      {appbar ?? <div className="h-64px" />}
      <div className="px-20px pt-16px">{children}</div>
    </div>
  );
};
