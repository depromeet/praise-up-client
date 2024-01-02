import clsx from "clsx";

type headerProps = {
  text: string;
  emphasis?: string;
  className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "type">;

export const PostHeader = ({
  text,
  className,
  emphasis,
  ...props
}: headerProps) => {
  return (
    <div {...props} className={clsx("text-b1 block w-full", className)}>
      {text.split("\\n").map((item: string) => {
        if (emphasis && item.split(emphasis).length > 1) {
          return (
            <div key={item}>
              <span>{item.split(emphasis)[0]}</span>
              <span className="text-h3">{emphasis}</span>
            </div>
          );
        } else {
          return (
            <span className="block" key={item}>
              {item}
            </span>
          );
        }
      })}
    </div>
  );
};
