export const KakaoLogin = () => {
  // TODO:
  const REST_API_KEY = "";
  const REDIRECT_URI = "";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <button type="button" onClick={handleLogin}>
      카카오 로그인
    </button>
  );
};
