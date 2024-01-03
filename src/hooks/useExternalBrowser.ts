import { useEffect } from "react";

export function UseExternalBrowser() {
  useEffect(() => {
    const agent = navigator.userAgent;
    // NOTE: 카카오톡 인앱 브라우저 방지
    if (agent.indexOf("KAKAO") != -1) {
      const URL = document.URL;
      window.open(
        `kakaotalk://web/openExternal?url=${encodeURIComponent(URL)}`,
      );
    }
    // TODO: 라인, 인스타그램 추후 대응
  }, []);

  return null;
}
