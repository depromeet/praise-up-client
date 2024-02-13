import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Close from "@/assets/icons/close.svg?react";
import PostIcon from "@/assets/icons/post.svg?url";
import { ArticleWrapper } from "@/components/app/post/common/ArticleWrapper";
import { Background } from "@/components/app/post/keyword/background";
import { Selector } from "@/components/app/post/keyword/selector";
import { Appbar } from "@/components/common/appbar";
import { ConfirmContext } from "@/components/common/confirm/confirm-context";
import { Header } from "@/components/common/header";
import { DefaultLayout } from "@/components/layout/default";

type locationProps = {
  state: {
    openPostGuide?: string;
  };
};

export const KeyWord = () => {
  const navigate = useNavigate();
  const location = useLocation() as locationProps;
  const openPostGuide = location.state as locationProps;
  const { confirm } = useContext(ConfirmContext);
  const [angle, setAngle] = useState(0);
  const [snap, setSnap] = useState(false);

  /** 게시글 작성 가이드 모달 함수 */
  const showGuideModal = async () => {
    const result = await confirm({
      message: {
        title: "게시글은 하루에 한개만\n작성할 수 있어요!",
        description: "하루 한번 칭찬 받고 싶은 일상을 올려주세요!",
      },
      cancel: {
        text: "작성하기",
      },
      icon: PostIcon,
    });

    if (!result) {
      return;
    }
  };

  /** 온보딩에서 openPostGuide가 location state로 넘어오게 되면 가이드 모달이 사용자에게 노출되도록 설정 */
  useEffect(() => {
    if (!openPostGuide) return;
    const timer = setTimeout(() => {
      void showGuideModal();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <DefaultLayout
      className="overflow-x-hidden"
      appbar={
        <Appbar
          className="!bg-transparent"
          left={
            <Close
              className="cursor-pointer transition-all duration-300"
              onClick={() => navigate("/main")}
              style={{ opacity: snap ? "0%" : "100" }}
            />
          }
        />
      }
    >
      <Background angle={angle} />
      <ArticleWrapper className="gap-y-[72px]">
        <Header
          text="오늘은 어떤 게시물을 작성할까요?"
          subText="원하는 주제의 칭찬구슬을 위로 밀어주세요!"
          className="!text-h3 transition-all duration-300"
          style={{ opacity: snap ? "0%" : "100" }}
        />
        <Selector
          angle={angle}
          setAngle={setAngle}
          snap={snap}
          setSnap={setSnap}
        />
      </ArticleWrapper>
    </DefaultLayout>
  );
};
