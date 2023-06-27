import React, { useEffect } from "react";

interface SocialButtonProps {
  title: string;
  bgColor: string;
  txtColor: string;
}
// 네이버 로그인
const SocialButton = (props: SocialButtonProps) => {
  const NAVER_CLIENT_ID =import.meta.env.VITE_NAVER_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:5173/";
  const STATE = "false";
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;


  const handleButtonClick = () => {
    if (props.title === "Naver") {
        window.location.href = NAVER_AUTH_URL;
      } else {
        // 카카오와 구글 버튼 클릭에 대한 처리
      }
    };

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");
    console.log(code);
    // 다음으로 할 작업을 수행하거나 리다이렉트 등을 처리할 수 있습니다.
    // navigate("/new-route"); // 예시로 navigate 함수를 사용한 리다이렉트
  }, [props.title]);
  return (
    <div className="flex justify-center">
      <button
        style={{ background: `${props.bgColor}` }}
        className={`w-11/12 text-sm flex justify-center mt-5 pt-3 pb-3 rounded text-${props.txtColor}`}
        onClick={handleButtonClick}
      >
        {props.title}로 로그인
      </button>
    </div>
  );
};

export default SocialButton;
