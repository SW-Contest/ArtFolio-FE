import axios from "axios";
import React, { useEffect } from "react";
import SocialButton from "./SocialButton";
import { HOST } from "../../constants/host";

const NaverOauth = () => {
  const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:3000/";
  const STATE = "false";
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;

  const sendCodeToBackend = async (provider: string, code: string) => {
    try {
      const BACKEND_SERVER_URL = `http://${HOST}login/oauth/${provider}?code=${code}`;

      // POST 요청 보내서 인가 코드와 프로바이더 정보 전달
      const response = await axios.post(`${BACKEND_SERVER_URL}/oauth`, {
        provider,
        code,
      });
    } catch (error) {
      console.error("Error sending code to backend:", error);
    }
  };

  // 컴포넌트가 렌더링 될 때 실행되는 useEffect를 사용하여 인가 코드를 백엔드로 전달
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      const provider = "naver";
      sendCodeToBackend(provider, code);
    }
  }, []);

  return (
    <div>
      <SocialButton
        title="Naver"
        iconURL="www.naver.com"
        txtColor={"white"}
        link={NAVER_AUTH_URL}
      />
    </div>
  );
};

// 예외처리도 하기!!!

export default NaverOauth;
