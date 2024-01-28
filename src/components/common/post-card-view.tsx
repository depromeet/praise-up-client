import clsx from "clsx";
import {
  Dispatch,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import { Menu } from "@/components/app/detail/menu";
import { usePostCardView } from "@/hooks/usePostCard";

interface PostCardViewProps {
  postId: number;
  userNickname: string;
  keyword: string;
  imageUrl: string; // TODO: required props
  content: string;
  isReadyCard?: boolean;
  isPublic?: boolean;
  postCreatedDate: string;
  children: ReactNode;
}

export interface PostCardContextProps {
  postId: number;
  userNickname: string;
  keyword: string;
  showMenu: boolean;
  imageUrl: string;
  content: string;
  postCreatedDate: string;
  isPublic: boolean;
  isReadyCard: boolean;
  setShowMenu: Dispatch<React.SetStateAction<boolean>>;
}

export const PostCardViewContext = createContext<
  PostCardContextProps | undefined
>(undefined);

export const PostCardView = ({
  postId,
  userNickname,
  keyword,
  imageUrl,
  content,
  postCreatedDate,
  isReadyCard = false, // flip 전 일러스트(Preview)인지
  isPublic = false, // 외부에 공개되는 게시글인지
  children,
}: PostCardViewProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [transStyle, toggleTransStyle] = useReducer(
    (prev: string) =>
      prev.includes("rotateY(180deg)") ? "none" : "rotateY(180deg)",
    isReadyCard || isPublic ? "none" : "rotateY(180deg)",
  );

  useEffect(() => {
    // 외부에 공개되는 게시물인 경우 flip 모션 방지
    if (!isPublic) {
      const timer = setTimeout(() => toggleTransStyle(), 1500);
      return () => clearTimeout(timer);
    }
  }, [isPublic]);

  return (
    <PostCardViewContext.Provider
      value={{
        postId,
        userNickname,
        keyword,
        showMenu,
        imageUrl,
        content,
        setShowMenu,
        postCreatedDate,
        isPublic,
        isReadyCard,
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
    postId,
    userNickname,
    keyword,
    showMenu,
    setShowMenu,
    isPublic,
    isReadyCard,
  }: PostCardContextProps = usePostCardView();

  return (
    <div className="flex w-full justify-between">
      <div className="text-b1 flex flex-col gap-0.5 text-gray-700">
        <span>{userNickname}님이 칭찬 받을</span>
        <div className="flex gap-1">
          <span className="text-h3 text-secondary">{keyword}</span>
          <span>순간</span>
        </div>
      </div>

      <Menu
        postId={postId}
        isPublic={isPublic}
        isReadyCard={isReadyCard}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
    </div>
  );
};

const Image = () => {
  const {
    content,
    imageUrl,
    postCreatedDate,
  }: { content: string; imageUrl: string; postCreatedDate: string } =
    usePostCardView();
  const contentRef = useRef<HTMLParagraphElement>(null);

  return (
    <div
      className="flex aspect-square w-full flex-col justify-end gap-3 rounded-3 bg-cover bg-no-repeat p-[18px] opacity-[.88]"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 48.46%, rgba(0, 0, 0, 0.56) 100%), url(${imageUrl})`,
        backgroundSize: "cover",
      }}
    >
      <p
        ref={contentRef}
        className="text-b2-long whitespace-pre-line text-gray-50"
      >
        {content}
      </p>
      <span className="text-num-b3 text-oncolor">
        {postCreatedDate.replace(/-/g, ".").slice(2)}
      </span>
    </div>
  );
};

const Preview = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div
      className="flex aspect-square w-full flex-col justify-end rounded-3 bg-cover bg-no-repeat p-[18px] opacity-[.88]"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
};

PostCardView.Title = Title;
PostCardView.Image = Image;
PostCardView.Preview = Preview;
