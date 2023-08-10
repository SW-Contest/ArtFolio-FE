import {
  NAVER_AUTH_URL,
  KAKAO_AUTH_URL,
  GOOGLE_AUTH_URL,
} from "../../constants/oauth";
interface SocialButtonProps {
  title: string;
}
// 네이버 로그인

const SocialButton = ({ title }: SocialButtonProps) => {
  const socialButtonInfo: any = {
    naver: {
      logoUrl: "/img/oauth/naver_login.png",
      bgColor: "#04c75b",
      borderColor: "#04c75b",
      authUrl: NAVER_AUTH_URL,
    },
    kakao: {
      logoUrl: "/img/oauth/kakao_login.png",
      bgColor: "#FEE500",
      borderColor: "#FEE500",
      authUrl: KAKAO_AUTH_URL,
    },
    google: {
      logoUrl: "/img/oauth/google_login.png",
      bgColor: "#ffffff",
      borderColor: "#9ca3af",
      authUrl: GOOGLE_AUTH_URL,
    },
  };

  const onClickHandler = () => {
    window.location.assign(socialButtonInfo[title].authUrl);
  };

  return (
    <div className="flex justify-center w-full">
      <button
        onClick={onClickHandler}
        className="flex items-center justify-center w-11/12 gap-2 rounded-lg border"
        style={{
          backgroundColor: socialButtonInfo[title].bgColor,
          borderColor: socialButtonInfo[title].borderColor,
        }}
      >
        <img
          className=" h-14"
          src={socialButtonInfo[title].logoUrl}
          alt="oauth_logo"
        />
      </button>
    </div>
  );
};

export default SocialButton;

// import { NAVER_AUTH_URL } from "../../constants/oauth";
// interface SocialButtonProps {
//   title: string;
// }
// // 네이버 로그인

// const SocialButton = ({ title }: SocialButtonProps) => {
//   const socialButtonInfo: any = {
//     naver: {
//       iconUrl: "/img/oauth/naver_logo.png",
//       txtColor: "white",
//       bgColor: "#04c75b",
//       authUrl: NAVER_AUTH_URL,
//     },
//   };

//   const onClickHandler = () => {
//     window.location.assign(socialButtonInfo[title].authUrl);
//   };

//   return (
//     <div className="flex justify-center w-full">
//       <button
//         onClick={onClickHandler}
//         className="flex items-center justify-center w-11/12 gap-2 rounded-lg"
//         style={{ backgroundColor: socialButtonInfo[title].bgColor }}
//       >
//         <img
//           className="w-12"
//           src={socialButtonInfo[title].iconUrl}
//           alt="naver_logo"
//         />
//         <p style={{ color: socialButtonInfo[title].txtColor }}>
//           {title}로 로그인
//         </p>
//       </button>
//     </div>
//   );
// };

// export default SocialButton;
