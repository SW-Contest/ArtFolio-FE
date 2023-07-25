import React, { useEffect } from "react";

interface SocialButtonProps {
  title: string;
  iconURL: string;
  txtColor: string;
  link : string
}
// 네이버 로그인

  const SocialButton = ({title,iconURL,txtColor,link}: SocialButtonProps) => {



  return (
    <div className="flex justify-center border border-gray-400 m-2 ">
      <a
        className={`w-11/12 text-sm flex justify-center items-center pt-5 pb-5 rounded text-${txtColor}`}
        href={link}
      >
        <img className="mr-2"src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${iconURL}&size=32`} alt="" />
        {title}로 로그인
      </a>
    </div>
  );
};

export default SocialButton;
