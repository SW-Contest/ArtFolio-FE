import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { HOST } from "../constants/host";

const Auth = () => {
  const sendCodeToBackend = async (code: string) => {
    try {
      const provider = "naver";
      //POST 요청 보내서 인가 코드 전달
      const response = await axios.post(
        `http://${HOST}/login/oauth/${provider}?code=${code}`
      );
      console.log(response);
    } catch (error) {
      console.error("Error sending code to backend:", error);
    }
  };

  // 컴포넌트가 렌더링 될 때 실행되는 useEffect를 사용하여 인가 코드를 백엔드로 전달
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const code = searchParams.get("code");

    // const code = urlParams.get("code");
    console.log(code);
    if (code) {
      sendCodeToBackend(code);
    }
  }, [searchParams]);
  return <div></div>;
};

export default Auth;
