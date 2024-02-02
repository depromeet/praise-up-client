import clsx from "clsx";
import Cookies from "js-cookie";
import { Fragment, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ChevronLeftEdgeSVG } from "@/assets/icons/chevron-left";
import { Appbar } from "@/components/common/appbar";
import { ConfirmContext } from "@/components/common/confirm/confirm-context";
import { DefaultLayout } from "@/components/layout/default";
import { useAuthStore } from "@/store/auth";

type TLocation = {
  state: {
    text: string;
  };
};

const notificationData = [
  "모든 활동 내용은 다시 볼 수 없어요",
  "칭찬 게시글이 모두 사라져요",
  "칭찬 받았던 내용(구슬)이 모두 사라져요",
  "다른 사용자에게 남긴 칭찬 내용은 삭제되지 않아요",
  "사용자 정보는 보관 없이 바로 파기돼요",
  "탈퇴 시 모든 데이터는 복구가 불가능해요",
];

const btnDefaultStyle =
  "flex basis-0 items-center justify-center py-4 font-semibold rounded-lg h-fit grow";

export const MyPageUnregisterConfirm = () => {
  const nav = useNavigate();
  const location = useLocation() as TLocation;
  const { confirm } = useContext(ConfirmContext);
  const { setAuth } = useAuthStore();

  useEffect(() => {
    console.log(location.state.text);
  }, [location]);

  const onClickClose = () => {
    nav("/mypage");
  };

  const onSubmit = async () => {
    const result = await confirm({
      message: {
        title: "praise up을 탈퇴할까요?",
        description:
          "짧은 기간 내 탈퇴와 재가입이 반복되면<br/>서비스 이용이 어려울 수 있어요",
      },
      confirm: {
        text: "탈퇴하기",
      },
      cancel: {
        text: "닫기",
      },
    });

    if (!result) {
      onClickClose();
      return;
    }

    unregisterService();
  };

  const unregisterService = () => {
    // TODO: 탈퇴 API 연동
    console.log("탈퇴");

    Cookies.remove("k-u-id");
    setAuth(0);

    nav("/mypage/unregister/done");
  };

  return (
    <Fragment>
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
        <p className="text-h2">탈퇴 전 꼭 확인해 주세요</p>
        <ul className="flex list-disc flex-col gap-[18px] py-9">
          {notificationData.map((text, idx) => (
            <li key={idx} className="ml-6 pl-1">
              {text}
            </li>
          ))}
        </ul>

        <div className="fixed bottom-0 left-1/2 mx-auto flex w-full max-w-[480px] translate-x-[-50%] gap-2.5 self-stretch px-4 pb-9">
          <button
            className={clsx(btnDefaultStyle, "bg-gray-300")}
            onClick={onClickClose}
          >
            <p className="w-fit text-primary">닫기</p>
          </button>
          <button
            className={clsx(btnDefaultStyle, "bg-[#242B37]")}
            onClick={onSubmit}
          >
            <p className="w-fit text-white">확인했습니다</p>
          </button>
        </div>
      </DefaultLayout>
    </Fragment>
  );
};
