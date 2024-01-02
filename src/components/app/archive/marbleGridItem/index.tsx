import UserFilled from "@/assets/icons/user_filled.svg";

export const MarbleGridItem = () => {
  return (
    <div className="relative box-border w-full rounded-lg bg-black after:block after:pb-[calc(100%)]">
      <div className="absolute bottom-[12px] right-[12px] flex h-8 w-[85px] items-center gap-1 rounded-lg bg-white/70 px-2 py-1.5 backdrop-blur-[20px]">
        <div className="w-4">
          <UserFilled />
        </div>
        <div className="text-sm font-normal text-gray-700">훈섭체고</div>
      </div>
    </div>
  );
};
