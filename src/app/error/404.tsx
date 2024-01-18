import { useNavigate } from "react-router-dom";

import ErrorImg from "@/assets/images/404.svg?react";
import { ButtonProvider } from "@/components/common/button-provider";
import { DefaultLayout } from "@/components/layout/default";
import useUserStore from "@/features/useUserStore";

export const NotFound = () => {
  const navigate = useNavigate();
  const { isLogin } = useUserStore();

  return (
    <DefaultLayout>
      <article className="flex w-full flex-col items-center justify-center">
        <ErrorImg width={320} height={324} className="mt-[34px]" />
        <div className="text-h3 mt-[38px] flex flex-col gap-y-[2px] text-center">
          <span>오류가 발생했어요</span>
          <span>요청하신 페이지를 찾을 수 없어요</span>
        </div>
      </article>
      <ButtonProvider>
        {/* TODO: 카카오 로그인 연동 후, 로그인이 되지 않은 상태일 경우에는 다른 메세지 제공 */}
        <ButtonProvider.Primary onClick={() => navigate("/")}>
          {isLogin ? "메인 홈으로 돌아가기" : "처음으로 돌아가기"}
        </ButtonProvider.Primary>
      </ButtonProvider>
    </DefaultLayout>
  );
};
