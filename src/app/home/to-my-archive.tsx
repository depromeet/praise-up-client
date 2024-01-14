import { EmptyArchiveSVG } from "@/assets/imgs/empty-archive";
import { PastCard } from "@/components/app/home/past-card";
import { ContentDataType } from "@/hooks/apis/main/useGetArchivePost";

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
        <div className="flex w-full flex-col items-center justify-center gap-2.5 py-[76px]">
          <EmptyArchiveSVG />
          <div className="flex flex-col items-center gap-1">
            <span className="text-b2-strong">
              아직 공개된 칭찬게시물이 없어요
            </span>
            <span className="text-b3-compact">
              공개 된 칭찬게시물은 이곳에 자동으로 나열돼요
            </span>
          </div>
        </div>
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
