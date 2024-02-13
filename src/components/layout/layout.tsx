import clsx from "clsx";
import { PropsWithChildren, ReactNode } from "react";

import { LogoSVG } from "@/assets/icons/logo";

const Layout = ({
  className,
  children,
}: {
  className?: string;
} & PropsWithChildren) => {
  return (
    <div
      className={clsx(
        "relative mx-auto flex min-h-[100dvh] w-screen max-w-[480px] flex-col shadow scrollbar-hide",
        className,
      )}
    >
      {children}
    </div>
  );
};

const Main = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <main className={clsx("flex flex-1 flex-col px-5 pt-4", className)}>
      {children}
    </main>
  );
};

type LeftAndContent =
  | { left: ReactNode; content?: string }
  | { left?: undefined; content?: never };

const Appbar = ({
  left,
  right,
  content,
  className,
}: {
  right?: ReactNode;
  className?: string;
} & LeftAndContent) => {
  // if left is not defined, render logo
  const _left = left ? left : <LogoSVG />;
  const _content = left ? content : null;

  return (
    <div
      className={clsx(
        "flex h-64px w-full items-center justify-between px-20px py-10px",
        className,
      )}
    >
      <div className="flex-1">
        <span className="grid place-content-start">{_left}</span>
      </div>
      <div className="flex-none">{_content}</div>
      <div className="flex-1">
        {right && <span className="grid place-content-end">{right}</span>}
      </div>
    </div>
  );
};

Layout.Main = Main;
Layout.Appbar = Appbar;
export { Layout };
