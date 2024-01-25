import { EmptyArchiveSVG } from "@/assets/imgs/empty-archive";

interface EmptyCardProps {
  text: string;
  subText: string;
}

export const EmptyCard = ({ text, subText }: EmptyCardProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2.5 py-[76px]">
      <EmptyArchiveSVG />
      <div className="flex flex-col items-center gap-1">
        <span className="text-b2-strong text-teritary">{text}</span>
        <span className="text-b3-compact text-gray-600">{subText}</span>
      </div>
    </div>
  );
};
