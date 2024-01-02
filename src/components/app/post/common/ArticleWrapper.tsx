import { PropsWithChildren } from "react";

export const ArticleWrapper = ({ children }: PropsWithChildren) => {
  return (
    <article className="flex flex-col gap-y-9 py-16px">{children}</article>
  );
};
