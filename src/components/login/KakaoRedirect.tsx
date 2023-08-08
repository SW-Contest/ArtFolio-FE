import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

const KakaoRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const provider = "kakao";

  useEffect(() => {
    const code = new URL(document.location.toString()).searchParams.get("code");
    const state = new URL(document.location.toString()).searchParams.get(
      "state"
    );

    console.log(code);
    const BACKEND_SERVER_URL = `http://syu.artfolio.shop/login/oauth/${provider}?code=${code}&state=${state}`;

    axios.get(`${BACKEND_SERVER_URL}`);
  }, []);

  return <div></div>;
};

export default KakaoRedirect;
