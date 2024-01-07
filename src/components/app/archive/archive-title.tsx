import clsx from "clsx";

type Props = {
  archiveMarbleNum: number;
  isLayout?: boolean;
};

export const ArchiveTitle = ({ archiveMarbleNum, isLayout = false }: Props) => {
  return (
    <div className="relative z-10">
      <div
        className={clsx(
          isLayout && "absolute ml-[20px]",
          "flex flex-col gap-0.5 text-lg text-primary",
        )}
      >
        <p>해당 게시물에 대해</p>
        <p>
          <span className="font-semibold">{archiveMarbleNum}개</span>의
          칭찬구슬이 모였어요!
        </p>
      </div>
    </div>
  );
};
