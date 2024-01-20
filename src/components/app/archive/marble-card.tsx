import clsx from "clsx";

import { TMarbleCard } from "@/types/archive";

type Props = {
  cardData: TMarbleCard;
};

export const MarbleCard = ({ cardData }: Props) => {
  if (!cardData) return null;
  const { content, imageUrl, keyword, postCreatedDate, userNickname } =
    cardData;

  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl bg-gray-100 p-4 pt-5">
      <div className="flex flex-col gap-0.5 text-lg text-gray-700">
        <p>{userNickname}님이 칭찬 받을</p>
        <p>
          <span className="font-semibold text-gray-800">{keyword}</span>
          <span> 순간</span>
        </p>
      </div>
      {/* background black은 임시 */}
      <div
        className={clsx(
          "after:block after:pb-[calc(100%)]",
          "rounded-x relative box-border w-full",
        )}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute flex h-full w-full flex-col justify-end gap-2 p-18px text-white">
          <p
            dangerouslySetInnerHTML={{
              __html: content.replace(/\\n/g, "<br/>"),
            }}
          />
          <p className="text-sm">
            {postCreatedDate.split("-").join(".").slice(2)}
          </p>
        </div>
      </div>
    </div>
  );
};
