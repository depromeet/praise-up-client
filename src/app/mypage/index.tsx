import { Link, useNavigate } from "react-router-dom";

import { ChevronLeftEdgeSVG } from "@/assets/icons/chevron-left";
import { ChevronRightEdgeSVG } from "@/assets/icons/chevron-right-edge";
import EditSvg from "@/assets/icons/edit.svg?react";
import ShineCircleSvg from "@/assets/icons/shine-circle.svg?react";
import { Appbar } from "@/components/common/appbar";
import { DefaultLayout } from "@/components/layout/default";

const User = ({ name }: { name: string }) => {
  return (
    <div className="flex justify-between">
      <span className="text-h2">{name}</span>
      <Link to="/mypage/edit">
        <EditSvg />
      </Link>
    </div>
  );
};

const GatheredMyClap = () => {
  return (
    <div className="flex justify-between rounded-3 bg-white p-20px">
      <div className="flex items-center">
        <ShineCircleSvg />
        <span className="text-h4">나의 칭찬 활동 모아보기</span>
      </div>
      <Link to="/mypage/claps">
        <ChevronRightEdgeSVG />
      </Link>
    </div>
  );
};

const About = () => {
  // TODO: add link to
  return (
    <div className="flex flex-col gap-5 bg-white px-20px py-36px">
      <h1 className="text-h3">About praise up</h1>
      {[
        { to: "", label: "praise up 서비스 소개" },
        { to: "", label: "개인정보 처리방침" },
        { to: "", label: "피드백" },
      ].map(({ to, label }) => (
        <Link className="text-b2-compact text-secondary" key={to} to={to}>
          {label}
        </Link>
      ))}
    </div>
  );
};

const Bottom = () => {
  // TODO: add link to
  return (
    <div className="flex grow flex-col gap-5 bg-white px-20px py-36px">
      {[
        { to: "", label: "로그아웃" },
        { to: "", label: "회원탈퇴" },
      ].map(({ to, label }) => (
        <Link className="text-b2-compact text-secondary" key={to} to={to}>
          {label}
        </Link>
      ))}
    </div>
  );
};

export const MyPage = () => {
  const nav = useNavigate();

  return (
    <DefaultLayout
      className="bg-gray-100"
      noXPadding
      appbar={
        <Appbar
          isPadding
          left={
            <button onClick={() => nav(-1)}>
              <ChevronLeftEdgeSVG />
            </button>
          }
        />
      }
    >
      <div className="flex flex-col px-20px">
        <User name="쥐렁이님" />
        <div className="pb-28px pt-36px">
          <GatheredMyClap />
        </div>
      </div>
      <div className="flex grow flex-col gap-2">
        <About />
        <Bottom />
      </div>
    </DefaultLayout>
  );
};
