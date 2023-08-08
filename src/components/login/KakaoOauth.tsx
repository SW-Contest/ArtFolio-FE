import { useEffect } from "react";
import axios from "axios";
import SocialButton from "./SocialButton";
import { HOST } from "../../constants/host";

const KakaoOauth = () => {
  const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
  const REDIRECT_URI = `http://localhost:3000/KakaoRedirect`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const kakaoOAuthHandler = () => {
    window.location.assign(KAKAO_AUTH_URL);
  };

  return (
    <div onClick={kakaoOAuthHandler}>
      <SocialButton
        title="Kakao"
        iconURL={"www.kakaocorp.com/page/"}
        txtColor={"white"}
      />
    </div>
  );
};

export default KakaoOauth;
