export const handleKakaoLogin = () => {
  const REST_API_KEY = import.meta.env.VITE_REST_API_KEY as string;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI as string;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  window.location.href = kakaoURL;
};

export const KakaoLogin = () => {
  return (
    <button type="button" onClick={handleKakaoLogin}>
      카카오 로그인
    </button>
  );
};
