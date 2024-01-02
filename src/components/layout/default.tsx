import { Fragment, PropsWithChildren, ReactNode } from "react";

import { ScrollToTop } from "@/hooks/useScrollToTop";

type Props = {
  resetScroll?: boolean;
  appbar?: ReactNode;
} & PropsWithChildren;

export const DefaultLayout = ({
  resetScroll = true,
  appbar,
  children,
}: Props) => {
  return (
    <Fragment>
      {resetScroll && <ScrollToTop />}
      <div className="relative mx-auto flex h-screen w-screen max-w-[480px] flex-col border-x">
        {/* need app bar variants */}
        {appbar ?? <div className="h-64px" />}
        <div className="flex flex-1 flex-col px-20px pt-16px">{children}</div>
      </div>
    </Fragment>
  );
};
