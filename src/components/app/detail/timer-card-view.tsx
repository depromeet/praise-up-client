import { ClockSVG } from "@/assets/clock";
import { TimeLeftType } from "@/hooks/useTimer";

interface TimerCardProps {
  timeLeft: TimeLeftType;
}

export const TimerCardView = ({ timeLeft }: TimerCardProps) => {
  return (
    <div className="flex animate-fadeIn items-center gap-2 rounded-3 bg-[#8AC2FF] px-4 py-2 text-secondary">
      <div className="flex items-center gap-0.5">
        <div className="flex items-center gap-1.5">
          <ClockSVG />
          <span className="text-num-b1-medium select-none tabular-nums ">
            {(timeLeft.hour || 0).toString().padStart(2, "0")}:
            {(timeLeft.min || 0).toString().padStart(2, "0")}:
            {(timeLeft.sec || 0).toString().padStart(2, "0")}
          </span>
        </div>
        <span className="text-b3-compact select-none">후에 칭찬 구슬 오픈</span>
      </div>
    </div>
  );
};
