import axios from "axios";

// OAuth 로그인을 시도합니다.
export const oauthLogin = async (body: {
  provider: string;
  code: string;
  state: string;
}) => {
  const { provider, code, state } = body;
  const response = await axios.get(
    `http://syu.artfolio.shop/login/oauth/${provider}?code=${code}&state=${state}`
  );
  return response;
};
