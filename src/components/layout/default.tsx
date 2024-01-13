import clsx from "clsx";
import { Fragment, PropsWithChildren, ReactNode } from "react";

import { UseExternalBrowser } from "@/hooks/useExternalBrowser";
import { UseScrollToTop } from "@/hooks/useScrollToTop";

type Props = {
  resetScroll?: boolean;
  appbar?: ReactNode;
  className?: string;
} & PropsWithChildren;

export const DefaultLayout = ({
  resetScroll = true,
  appbar,
  children,
  className,
}: Props) => {
  return (
    <Fragment>
      <UseExternalBrowser />
      {resetScroll && <UseScrollToTop />}
      <div
        className={clsx(
          "relative mx-auto flex min-h-[100dvh] w-screen max-w-[480px] flex-col shadow",
          className,
        )}
      >
        {/* need app bar variants */}
        {appbar ?? <div className="h-64px" />}
        <div className="flex flex-1 flex-col px-20px pt-16px">{children}</div>
      </div>
    </Fragment>
  );
};
