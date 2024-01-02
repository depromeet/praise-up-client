import { ClockSVG } from "@/assets/clock";

interface TimerCardProps {
  timer: string;
}

export const TimerCardView = ({ timer }: TimerCardProps) => {
  return (
    <div className="flex items-center gap-2 rounded-3 bg-blue-400 px-4 py-2 text-secondary">
      <div className="flex items-center gap-0.5">
        <div className="flex items-center gap-1.5">
          <ClockSVG />
          <span className="text-num-b1-medium">{timer}</span>
        </div>
        <span className="text-b3-compact">후에 구슬 오픈</span>
      </div>
    </div>
  );
};
