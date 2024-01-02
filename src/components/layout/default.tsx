import { PropsWithChildren, ReactNode } from "react";

type Props = {
  appbar?: ReactNode;
} & PropsWithChildren;

export const DefaultLayout = ({ appbar, children }: Props) => {
  return (
    <div className="mx-auto flex h-screen w-screen max-w-[480px] flex-col border-x">
      {/* need app bar variants */}
      {appbar ?? <div className="h-64px" />}
      <div className="flex flex-1 flex-col px-20px pt-16px">{children}</div>
    </div>
  );
};
