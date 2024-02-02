import { Link, useNavigate } from "react-router-dom";

import { ChevronLeftEdgeSVG } from "@/assets/icons/chevron-left";
import EditSvg from "@/assets/icons/edit.svg?react";
import { Appbar } from "@/components/common/appbar";
import { Header } from "@/components/common/header";
import { DefaultLayout } from "@/components/layout/default";

type ReasonText = {
  landing: string;
  to: string;
  text?: string;
};

const ReasonData: ReasonText[] = [
  {
    landing: "사용하지 않는 앱이에요",
    text: "사용하지 않는 이유가 무엇인가요?",
    to: "/mypage/unregister/input",
  },
  {
    landing: "함께 사용할 유저가 없어요",
    text: "함께 사용할 유저가 없어요",
    to: "/mypage/unregister/confirm",
  },
  {
    landing: "개인정보 노출이 우려돼요",
    text: "개인정보 노출이 우려돼요",
    to: "/mypage/unregister/confirm",
  },
  {
    landing: "사용 방법이 어려워요",
    text: "어떤 부분에서 어려움을 느끼셨나요?",
    to: "/mypage/unregister/input",
  },
  {
    landing: "지속된 오류와 버그가 있어요",
    text: "어떤 오류와 버그를 겪으셨나요?",
    to: "/mypage/unregister/input",
  },
  {
    landing: "기타",
    text: "이유를 적어주세요.",
    to: "/mypage/unregister/input",
  },
];

const ReasonItem = ({ landing, text, to }: ReasonText) => {
  return (
    <div className="flex content-between">
      <p>{landing}</p>
      <Link to={to} state={{ text }}>
        <EditSvg />
      </Link>
    </div>
  );
};

export const MyPageUnregister = () => {
  const nav = useNavigate();

  return (
    <DefaultLayout
      appbar={
        <Appbar
          left={
            <button onClick={() => nav(-1)}>
              <ChevronLeftEdgeSVG />
            </button>
          }
        />
      }
    >
      <Header text="탈퇴하는 이유가 무엇인가요?" />
      <div>
        {ReasonData.map((data, idx) => (
          <ReasonItem {...data} key={idx} />
        ))}
      </div>
    </DefaultLayout>
  );
};
