import { useNavigate } from "react-router-dom";

import { CountBadge } from "@/components/app/home/count-badge";

interface PastCardProps {
  postId: number;
  imageUrl: string;
  commentCount: number;
  postCreatedDate: string;
  keyword: string;
}

export const PastCard = ({
  postId,
  imageUrl,
  commentCount,
  postCreatedDate,
  keyword,
}: PastCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="rounded-t-3 flex flex-col items-start justify-between hover:cursor-pointer"
      onClick={() => navigate("/archive", { state: { postId } })}
    >
      <div
        className="rounded-t-3 flex aspect-square w-full flex-col items-end bg-cover bg-no-repeat p-3"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <CountBadge count={commentCount} />
      </div>
      <div className="rounded-b-3 flex w-full flex-col items-end gap-0.5 bg-white p-3">
        <div className="text-cap-compact self-stretch">
          {postCreatedDate.replace(/-/g, ".")}
        </div>
        <div className="text-b2-strong self-stretch">{keyword}</div>
      </div>
    </div>
  );
};
