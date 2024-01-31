import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ChevronLeftEdgeSVG } from "@/assets/icons/chevron-left";
import { ChevronRightEdgeSVG } from "@/assets/icons/chevron-right-edge";
import EditSvg from "@/assets/icons/edit.svg?react";
import ShineCircleSvg from "@/assets/icons/shine-circle.svg?react";
import { Appbar } from "@/components/common/appbar";
import { ConfirmContext } from "@/components/common/confirm/confirm-context";
import { DefaultLayout } from "@/components/layout/default";
import { useApiUserInfo } from "@/hooks/api/my-page/useApiUserInfo";
import { TUserInfo } from "@/types/my-page";

type Temp = {
  onClick: () => void;
};

const User = ({ name }: { name: string }) => {
  return (
    <div className="flex justify-between">
      <span className="text-h2">{name}님</span>
      <Link to="/mypage/edit" state={{ name }}>
        <EditSvg />
      </Link>
    </div>
  );
};

const GatheredMyClap = ({ onClick }: Temp) => {
  return (
    <div
      className="flex justify-between rounded-3 bg-white p-20px"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <ShineCircleSvg />
        <span className="text-h4">나의 칭찬 활동 모아보기</span>
      </div>
      <ChevronRightEdgeSVG />
      {/* NOTE: temp */}
      {/* <Link to="/mypage/claps">
        <ChevronRightEdgeSVG />
      </Link> */}
    </div>
  );
};

const About = ({ onClick }: Temp) => {
  // TODO: add link to
  return (
    <div className="flex flex-col gap-5 bg-white px-20px py-36px">
      <h1 className="text-h3">About praise up</h1>
      {[
        { to: "", label: "praise up 서비스 소개" },
        { to: "", label: "개인정보 처리방침" },
        { to: "", label: "피드백" },
      ].map(({ to, label }, idx) => (
        <Link
          className="text-b2-compact text-secondary"
          key={idx}
          to={to}
          onClick={onClick}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

const Bottom = ({ onClick }: Temp) => {
  const nav = useNavigate();
  const { confirm } = useContext(ConfirmContext);

  const onClickLogout = async () => {
    const result = await confirm(
      {
        title: "로그아웃할까요?",
        description: "",
      },
      {
        text: "취소",
      },
      {
        text: "로그아웃",
      },
    );

    if (!result) return;
    Cookies.remove("k-u-id");
    nav("/");
  };

  // TODO: add link to
  return (
    <div className="flex grow flex-col gap-5 bg-white px-20px py-36px">
      {[
        { onClick: onClickLogout, label: "로그아웃" },
        { onClick, label: "회원탈퇴" },
      ].map(({ onClick, label }, idx) => (
        <button
          className="text-b2-compact text-start text-secondary"
          key={idx}
          onClick={onClick}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export const MyPage = () => {
  const { data } = useApiUserInfo(Cookies.get("k-u-id"));
  const nav = useNavigate();
  const { confirm } = useContext(ConfirmContext);

  const [userInfo, setUserInfo] = useState<TUserInfo>();

  useEffect(() => {
    if (!data) return;

    setUserInfo(data);
  }, [data]);

  const onClickDevelop = async () => {
    await confirm(
      {
        title: "아직 개발중이에요...🫣",
        description: "조금만 기다려주세요!",
      },
      {
        text: "닫기",
      },
    );
  };

  if (!userInfo) return null;
  return (
    <DefaultLayout
      className="bg-gray-100"
      noXPadding
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
      <div className="flex flex-col px-20px">
        <User name={userInfo.nickname} />
        <div className="pb-28px pt-36px">
          <GatheredMyClap onClick={onClickDevelop} />
        </div>
      </div>
      <div className="flex grow flex-col gap-2">
        <About onClick={onClickDevelop} />
        <Bottom onClick={onClickDevelop} />
      </div>
    </DefaultLayout>
  );
};
