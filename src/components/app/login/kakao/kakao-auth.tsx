import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";
import useUserStore from "@/features/useUserStore";

type responseDataProps = {
  userId: number;
};

export const KakaoAuth = () => {
  const navigate = useNavigate();
  const { setIsLogin } = useUserStore();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    const params = { code: code };
    // TODO: URL에서 추출한 code 값을 통해 백엔드 API 요청 후, 토큰 저장

    api
      .get(`/praise-up/api/v1/sign-up`, { params })
      .then((res) => {
        // TODO: 성공 페이지로 이동
        Cookies.set("k-u-id", `${(res.data as responseDataProps).userId}`, {
          expires: 0.5,
        });
        setIsLogin(true);
        navigate("/signup");
      })
      .catch((err) => {
        // TODO: 에러 발생 페이지로 이동
        console.log(err);
        navigate("/error");
      });
  }, []);

  return null;
};
