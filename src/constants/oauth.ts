const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
// const REDIRECT_URI = "http://43.202.60.225:3000/auth/";
export const REDIRECT_URI = "http://localhost:3000/auth";

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=false&redirect_uri=${REDIRECT_URI}/naver`;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}/kakao&response_type=code`;
export const GOOGLE_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=false&redirect_uri=${REDIRECT_URI}`;
