import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../common/Layout";
import Logo from "./Logo";

const NaverRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dataReceived, setDataReceived] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (!dataReceived) {
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
            const { id, accessToken, refreshToken } = res.data.response;
            console.log("데이터가 들어왔나요?", res.data);
            console.log("id가 들어오나요", id);

            localStorage.setItem("accesstoken", accessToken);
            localStorage.setItem("refreshtoken", refreshToken);
            localStorage.setItem("userId", id);

            // 두번 호출 방지
            setDataReceived(true);

            //1초마다 카운트 줄어듬
            const countdownInterval = setInterval(() => {
              setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);

            setTimeout(() => {
              clearInterval(countdownInterval);
              navigate("/");
            }, 3000);
          })
          .catch((error) => {
            console.log("네이버 로그인 오류:", error);
          });
        console.log("코드 받아오기 성공!");
      }
    }
  }, [dataReceived, location, navigate, countdown]);

  return (
    <Layout>
      <div className="bg-black h-screen pt-[150px]">
        <Logo />
        <div className="flex justify-center my-10">
          <div className="text-white text-lg">
            로그인이 완료되었습니다. <br />
            {countdown}초 뒤 메인으로 이동합니다.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NaverRedirect;
