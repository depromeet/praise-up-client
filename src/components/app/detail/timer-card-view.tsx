import { ClockSVG } from "@/assets/clock";
import { useTimer } from "@/hooks/useTimer";

interface TimerCardProps {
  openDateTime: Date;
}

export const TimerCardView = ({ openDateTime }: TimerCardProps) => {
  const { timeLeft } = useTimer(openDateTime);

  return (
    <div className="flex items-center gap-2 rounded-3 bg-[#8AC2FF] px-4 py-2 text-secondary">
      <div className="flex items-center gap-0.5">
        <div className="flex items-center gap-1.5">
          <ClockSVG />
          <span className="text-num-b1-medium select-none tabular-nums ">
            {timeLeft.hour.toString().padStart(2, "0")}:
            {timeLeft.min.toString().padStart(2, "0")}:
            {timeLeft.sec.toString().padStart(2, "0")}
          </span>
        </div>
        <span className="text-b3-compact select-none">후에 칭찬 구슬 오픈</span>
      </div>
    </div>
  );
};
