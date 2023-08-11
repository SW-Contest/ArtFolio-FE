const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
const REDIRECT_URI = "http://localhost:3000/auth/naver";

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=false&redirect_uri=${REDIRECT_URI}`;
export const KAKAO_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=false&redirect_uri=${REDIRECT_URI}`;
export const GOOGLE_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=false&redirect_uri=${REDIRECT_URI}`;
