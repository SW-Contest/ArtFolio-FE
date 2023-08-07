import { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const NaverRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(location);
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const provider = "naver";

    console.log("code:", code);
    console.log("provider:", provider);
    console.log("state:", state);

    if (code) {
      const BACKEND_SERVER_URL = `http://syu.artfolio.shop/login/oauth/${provider}?code=${code}&state=${state}`;
      axios
        .get(`${BACKEND_SERVER_URL}`)
        .then((res) => {
          console.log(res);

          const ACCESS_TOKEN = res.data.accessToken;
          const USER_ID = res.data.userId;

          localStorage.setItem("token", ACCESS_TOKEN);
          localStorage.setItem("userId", USER_ID);
          //access token, user id, refresh token 받아오기
          //유저정보랑 어쩌구 분리

          navigate("/");
        })
        .catch((error: any) => {
          console.log("네이버 로그인 오류:", error);
        });
      console.log("코드 받아오기 성공!");
    }
  }, [location, navigate]);

  return <div>로그인 완료?</div>;
};

export default NaverRedirect;
