import clsx from "clsx";
import { Fragment } from "react";

type headerProps = {
  text: string;
  subText?: string;
  emphasis?: string[];
  className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "type">;

export const Header = ({ text, subText, className, ...props }: headerProps) => {
  const parseTextToJSX = (text: string) => {
    const regex = /\{(.*?)\}|([^{}]+)/g;
    const matches = text.matchAll(regex);

    return Array.from(matches).map((match, index) => {
      if (match[1]) {
        return (
          <span key={index} className="text-h3">
            {match[1]}
          </span>
        );
      } else {
        return <span key={index}>{match[2]}</span>;
      }
    });
  };

  return (
    <div {...props} className={clsx("text-b1 block w-full", className)}>
      {text.split("\\n").map((item) => (
        <div key={item}>
          {parseTextToJSX(item).map((scaled, index) => (
            <Fragment key={index}>{scaled}</Fragment>
          ))}
        </div>
      ))}
      {subText && (
        <span className="text-b3-compact mt-2 text-gray-600">{subText}</span>
      )}
    </div>
  );
};
