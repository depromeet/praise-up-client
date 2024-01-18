import { EmptyCard } from "@/components/app/home/empty-card";
import { PastCard } from "@/components/app/home/past-card";
import { ContentDataType } from "@/hooks/apis/main/useGetPost";

interface ArchiveDataType extends ContentDataType {
  imgUrl?: string; // 추후 연동 예정
}

interface ToMyArchiveProps {
  archive: ArchiveDataType[];
}

export const ToMyArchive = ({ archive }: ToMyArchiveProps) => {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-h2">나의 칭찬 게시물</h2>
      {archive.length === 0 ? (
        <EmptyCard
          text={"아직 공개된 칭찬게시물이 없어요"}
          subText={"공개 된 칭찬게시물은 이곳에 자동으로 나열돼요"}
        />
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {archive.map((post, idx) => (
            <PastCard key={idx} {...post} />
          ))}
        </div>
      )}
    </section>
  );
};
