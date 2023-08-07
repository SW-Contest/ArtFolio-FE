import axios from "axios";

import SocialButton from "./SocialButton";

const NaverOauth = () => {
  const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
  const REDIRECT_URI = `http://localhost:3000/NaverRedirect`;
  const STATE_STRING = "false";
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE_STRING}&redirect_uri=${REDIRECT_URI}`;

  const naverOAuthHandler = () => {
    window.location.assign(NAVER_AUTH_URL);
  };
  return (
    <div onClick={naverOAuthHandler}>
      <SocialButton title="Naver" iconURL="www.naver.com" txtColor={"white"} />
    </div>
  );
};

export default NaverOauth;
