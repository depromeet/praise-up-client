import clsx from "clsx";

import { PastCard } from "./past-card";

import { EmptyArchiveSVG } from "@/assets/empty-archive";

interface ArchiveDataType {
  imgUrl: string;
  count: number;
  date: Date;
  keyword: string;
}

interface ToMyArchiveProps {
  archive: ArchiveDataType[]; // temp data type
}

export const ToMyArchive = ({ archive }: ToMyArchiveProps) => {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-h2">나의 칭찬 게시물</h2>
      {archive.length === 0 ? (
        <div
          className={clsx(
            "flex w-full flex-col items-center justify-center gap-2.5 py-[76px]",
          )}
        >
          <EmptyArchiveSVG />
          <div className={clsx("flex flex-col items-center gap-1")}>
            <span className={clsx("text-b2-strong")}>
              {" "}
              아직 공개된 칭찬게시물이 없어요
            </span>
            <span className={clsx("text-b3-compact")}>
              공개 된 칭찬게시물은 이곳에 자동으로 나열돼요
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {[...archive].reverse().map((d, i) => (
            <PastCard key={i} {...d} />
          ))}
        </div>
      )}
    </section>
  );
};
