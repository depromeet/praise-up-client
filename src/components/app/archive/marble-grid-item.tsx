import UserFilled from "@/assets/icons/user-filled.svg?react";
import { TMarble } from "@/types/archive";

type Props = {
  marble: TMarble;
  onClick?: () => void;
};

export const MarbleGridItem = ({ marble, onClick }: Props) => {
  const { nickname, imageUrl } = marble;
  return (
    <div
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={onClick}
      className="relative box-border w-full rounded-lg after:block after:pb-[calc(100%)]"
    >
      <div className="absolute bottom-[12px] right-[12px] flex h-8 w-fit items-center gap-1 rounded-lg bg-white/70 px-2 py-1.5 backdrop-blur-[20px]">
        <div className="w-4">
          <UserFilled />
        </div>
        <div className="text-sm font-normal text-secondary">{nickname}</div>
      </div>
    </div>
  );
};
