import Cookies from "js-cookie";

export function UseExternalBrowser() {
  const agent = navigator.userAgent;
  const URL = document.URL;
  let isExternalBrowser = false;

  // NOTE: 카카오톡 인앱 브라우저 방지
  if (agent.indexOf("KAKAO") !== -1) {
    window.open(`kakaotalk://web/openExternal?url=${encodeURIComponent(URL)}`);
  } else if (agent.indexOf("Instagram") !== -1) {
    // NOTE: 현재는 해당 인스타그램 인앱 탈출 코드가 작동하지 않는 것 같음
    window.open(`https://www.praise-up.app`, "_system");
  } else {
    isExternalBrowser = true;
  }

  if (!isExternalBrowser) {
    Cookies.set("isEnternalBrowser", "false");
  } else {
    if (Cookies.get("isEnternalBrowser")) {
      Cookies.remove("isEnternalBrowser");
    }
  }

  return null;
}
