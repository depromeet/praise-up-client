import { PropsWithChildren, ReactNode } from "react";

type Props = {
  appbar?: ReactNode;
} & PropsWithChildren;

export const DefaultLayout = ({ appbar, children }: Props) => {
  return (
    <div className="absolute left-1/2 top-1/2 h-full w-full max-w-[480px] -translate-x-1/2 -translate-y-1/2 border-x ">
      {/* need app bar variants */}
      {appbar ?? <div className="h-64px" />}
      <div className="px-20px pt-16px">{children}</div>
    </div>
  );
};
