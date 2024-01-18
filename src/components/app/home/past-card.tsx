import { CountBadge } from "./Count-badge";

interface PastCardProps {
  imageUrl?: string;
  commentCount: number;
  postCreatedDate: string;
  keyword: string;
}

export const PastCard = ({
  imageUrl,
  commentCount,
  postCreatedDate,
  keyword,
}: PastCardProps) => {
  return (
    <div className="flex flex-col items-start justify-between rounded-t-3 hover:cursor-pointer">
      <div
        className="flex aspect-square w-full flex-col items-end rounded-t-3 bg-cover bg-no-repeat p-3"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <CountBadge count={commentCount} />
      </div>
      <div className="flex w-full flex-col items-end gap-0.5 rounded-b-3 bg-white p-3">
        <div className="text-cap-compact self-stretch">
          {postCreatedDate.replace(/-/g, ".")}
        </div>
        <div className="text-b2-strong self-stretch">{keyword}</div>
      </div>
    </div>
  );
};
