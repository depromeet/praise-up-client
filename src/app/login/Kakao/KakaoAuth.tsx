import { useEffect } from "react";

import { api } from "@/api";

export const KakaoAuth = () => {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    // TODO: URL에서 추출한 code 값을 통해 백엔드 API 요청 후, 토큰 저장
    api
      .post(``)
      .then((res) => {
        // TODO: 성공 페이지로 이동
        console.log(res);
      })
      .catch((err) => {
        // TODO: 에러 발생 페이지로 이동
        console.log(err);
      });
  }, []);

  return <div>카카오 로그인 중..</div>;
};
