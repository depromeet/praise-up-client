import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";
import { useAuthStore } from "@/store/auth";

type Response = {
  data: responseDataProps;
};

type responseDataProps = {
  userId: number;
  isSigned: boolean;
};

export const KakaoAuth = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    const params = { code: code };
    // TODO: URL에서 추출한 code 값을 통해 백엔드 API 요청 후, 토큰 저장

    api
      .get(`/praise-up/api/v1/sign-up`, { params })
      .then((res: Response) => {
        // TODO: 성공 페이지로 이동
        const { userId, isSigned } = res.data;

        Cookies.set("k-u-id", userId.toString(), {
          expires: 0.5,
        });
        setAuth(userId);

        if (isSigned) {
          navigate("/signup");
        } else {
          navigate("/main");
        }
      })
      .catch((err) => {
        // TODO: 에러 발생 페이지로 이동
        console.log(err);
        navigate("/error");
      });
  }, []);

  return null;
};
