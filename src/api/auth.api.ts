import axios from "axios";
import { CLIENT_HOST, HOST } from "../constants/host";
import { REDIRECT_URI } from "../constants/oauth";

// OAuth 로그인을 시도합니다.
export const oauthLogin = async (body: {
  provider: string;
  code: string;
  state: string;
}) => {
  const { provider, code, state } = body;
  if (provider === "naver") {
    const response = await axios.get(
      `http://syu.artfolio.shop/login/oauth/${provider}?code=${code}&state=${state}`
    );
    return response;
  }
  if (provider === "kakao") {
    const encodedRedirectUri = encodeURIComponent(`${REDIRECT_URI}` + "/kakao");
    console.log(encodedRedirectUri);
    const response = await axios.get(
      `http://syu.artfolio.shop/login/oauth/${provider}?code=${code}&redirectUri=${encodedRedirectUri}`
    );
    return response;
  }
};
