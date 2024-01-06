import clsx from "clsx";
import { PropsWithChildren } from "react";

type articleProps = {
  className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "type">;

export const ArticleWrapper = ({
  children,
  className,
  ...props
}: PropsWithChildren<articleProps>) => {
  return (
    <article
      {...props}
      className={clsx("flex flex-col gap-y-9 py-16px", className)}
    >
      {children}
    </article>
  );
};
