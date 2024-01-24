import clsx from "clsx";

interface SwtichProps {
  isOn: boolean;
}

export const Switch = ({ isOn }: SwtichProps) => {
  return (
    <div
      className={clsx(
        "flex w-44px items-center rounded-[40px] p-2px transition-all duration-300",
        isOn ? "bg-[#338AFF]" : "bg-gray-400",
      )}
    >
      <div
        className={clsx(
          "h-20px w-20px rounded-full bg-white transition-all duration-300",
          isOn && "translate-x-full",
        )}
      ></div>
    </div>
  );
};
