import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Close from "@/assets/icons/close.svg?react";
import { ArticleWrapper } from "@/components/app/post/common/ArticleWrapper";
import { Background } from "@/components/app/post/keyword/background";
import { Selector } from "@/components/app/post/keyword/selector";
import { Appbar } from "@/components/common/appbar";
import { Header } from "@/components/common/header";
import { DefaultLayout } from "@/components/layout/default";

export const KeyWord = () => {
  const navigate = useNavigate();
  const [angle, setAngle] = useState(0);
  const [snap, setSnap] = useState(false);

  return (
    <DefaultLayout className="overflow-x-hidden" appbar={false}>
      <Appbar
        left={
          <Close
            className="cursor-pointer transition-all duration-300"
            onClick={() => navigate("/main")}
            style={{ opacity: snap ? "0%" : "100" }}
          />
        }
      />
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
