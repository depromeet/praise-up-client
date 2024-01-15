import clsx from "clsx";
import { ReactNode, createContext, useEffect, useReducer, useRef } from "react";

import { KebabSVG } from "@/assets/kebab";
import { usePostCardView } from "@/hooks/usePostCard";

interface PostCardViewProps {
  id: string;
  username: string;
  keyword: string;
  imgUrl: string;
  content: string;
  isReadyCard?: boolean;
  isPublic?: boolean;
  children: ReactNode;
}

export interface PostCardContextProps {
  id: string;
  username: string;
  keyword: string;
  showMenu: boolean;
  imgUrl: string;
  content: string;
  isPublic: boolean;
  toggleShowMenu: (showMenu?: boolean) => void;
}

export const PostCardViewContext = createContext<
  PostCardContextProps | undefined
>(undefined);

export const PostCardView = ({
  id,
  username,
  keyword,
  imgUrl,
  content,
  isReadyCard = false, // flip 전 일러스트(Preview)인지
  isPublic = false, // 외부에 공개되는 게시글인지
  children,
}: PostCardViewProps) => {
  const [showMenu, toggleShowMenu] = useReducer((prev) => !prev, false);
  const [transStyle, toggleTransStyle] = useReducer(
    (prev: string) =>
      prev.includes("rotateY(180deg)") ? "none" : "rotateY(180deg)",
    isReadyCard || isPublic ? "none" : "rotateY(180deg)",
  );

  useEffect(() => {
    // 외부에 공개되는 게시물인 경우 flip 모션 방지
    if (!isPublic) {
      const timer = setTimeout(() => toggleTransStyle(), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <PostCardViewContext.Provider
      value={{
        id,
        username,
        keyword,
        showMenu,
        imgUrl,
        content,
        toggleShowMenu,
        isPublic,
      }}
    >
      <div
        className={clsx(
          { absolute: isReadyCard },
          "  flex w-full flex-col items-start gap-4 rounded-4 bg-gray-200 px-4 pb-4 pt-5 transition-transform duration-1000 [backface-visibility:hidden] ",
        )}
        style={{
          transform: transStyle,
        }}
      >
        {children}
      </div>
    </PostCardViewContext.Provider>
  );
};

const Title = () => {
  const {
    username,
    keyword,
    showMenu,
    toggleShowMenu,
    isPublic,
  }: PostCardContextProps = usePostCardView();

  return (
    <div className="flex w-full justify-between">
      <div className="flex flex-col gap-0.5">
        <span className="text-b1">{username}님이 칭찬 받을</span>
        <div className="flex gap-1">
          <span className="text-h3">{keyword}</span>
          <span className="text-b1">순간</span>
        </div>
      </div>

      {!isPublic && (
        <div className="h-fit cursor-pointer" onClick={() => toggleShowMenu()}>
          <KebabSVG />
        </div>
      )}

      {showMenu && (
        <div
          onClick={() => {
            console.log("삭제하기 클릭");
          }}
          className="fixed right-9 top-[240px] z-10 flex h-11 items-center rounded-3 bg-white px-4 py-3"
        >
          <span className="text-b3-compact">삭제하기</span>
        </div>
      )}
    </div>
  );
};

const Image = () => {
  const { content, imgUrl }: { content: string; imgUrl: string } =
    usePostCardView();
  const contentRef = useRef<HTMLParagraphElement>(null);

  return (
    <div
      className=" flex aspect-square w-full flex-col justify-end rounded-3 bg-cover bg-no-repeat p-[18px] opacity-[.88]"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 48.46%, rgba(0, 0, 0, 0.56) 100%), url(${imgUrl})`,
        backgroundSize: "cover",
      }}
    >
      <p
        ref={contentRef}
        className="text-b2-long whitespace-pre-line text-gray-50"
      >
        {content}
      </p>
      <span className="text-num-b3 text-oncolor">23.12.16</span>
    </div>
  );
};

const Preview = () => {
  const { imgUrl } = usePostCardView();

  return (
    <div
      className=" flex aspect-square w-full flex-col justify-end rounded-3 bg-cover bg-no-repeat p-[18px] opacity-[.88]"
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
};

PostCardView.Title = Title;
PostCardView.Image = Image;
PostCardView.Preview = Preview;
