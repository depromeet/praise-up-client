import { MarbleSVG } from "@/assets/icons/marble";

interface CountBadgeProps {
  count: number;
}

export const CountBadge = ({ count }: CountBadgeProps) => {
  return (
    <div className="flex w-fit items-center gap-1 rounded-2 border-[1px] border-[secondary] bg-[#ffffffcc]  px-2 py-1.5 backdrop-blur-[10px]">
      <MarbleSVG />
      <div className="text-gray-800">
        <span className="text-num-b3-strong">{count}</span>
        <span className="text-b3-compact">개</span>
      </div>
    </div>
  );
};
