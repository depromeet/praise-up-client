import { PropsWithChildren, ReactNode } from "react";

type Props = {
  appbar?: ReactNode;
} & PropsWithChildren;

export const DefaultLayout = ({ appbar, children }: Props) => {
  return (
    <div className='"max-w-[480px]"'>
      {/* need app bar variants */}
      {appbar ?? <div className="h-16" />}
      <div className="px-5 pt-4">{children}</div>
    </div>
  );
};
