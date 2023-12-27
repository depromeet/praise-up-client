import { PropsWithChildren, ReactNode } from "react";

type Props = {
  appbar?: ReactNode;
} & PropsWithChildren;

export const DefaultLayout = ({ appbar, children }: Props) => {
  return (
    <div className="absolute left-1/2 top-1/2 h-full w-full max-w-[480px] -translate-x-1/2 -translate-y-1/2 border-x ">
      {/* need app bar variants */}
      {appbar ?? <div className="h-16" />}
      <div className="px-5 pt-4">{children}</div>
    </div>
  );
};
