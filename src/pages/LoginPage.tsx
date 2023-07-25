import React, { useEffect, useState } from 'react';
import Layout from '../components/ui/Layout';
import Logo from '../components/login/Logo';
import InputBar from '../components/login/InputBar';
import SocialButton from '../components/login/SocialButton';
import NaverOauth from '../components/login/NaverOauth';
import KakaoOauth from '../components/login/KakaoOauth';
import GoogleOauth from '../components/login/GoogleOauth';

const userdata = [{
    email: "ovovvvvv@naver.com",
    passwd: "1234",
  },
  {
    email: "gogogo1@naver.com",
    passwd: "2345",
  },
  {
    email: "daom123@naver.com",
    passwd: "3456",
  },
];

const LoginPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const onEmailchangeHandler = (value: string) => {
    setEmailValue(value);
  };

//    const loginHandler = () => {
//      const user = userdata.find((user) => user.email === emailValue && user.passwd === passwordValue);
//      if (user) {    
//          console.log("로그인 성공");
//        }
//        else {
//            console.log("로그인 실패");
//        }

//    };

    return (
            <Layout>
                <div className='bg-black h-screen pt-[150px]'>
            <header>
            <Logo />
            </header>
            <div className=''>
                <div className='w-full flex items-center justify-center list-none  text-xs mt-4 text-slate-400 space-x-4'>
                </div>
            </div>
            <div className='text-slate-400 text-sm flex items-center'>
        </div>
           <NaverOauth />
           <KakaoOauth/>
          <GoogleOauth />
            </div>
            </Layout>

    );
    if (user) {
      console.log("로그인 성공");
    } else {
      console.log("로그인 실패");
    }
  };

  return (
    <Layout>
      <Logo />
      <div className="mt-16">
        <InputBar
          emailValue={emailValue}
          passwordValue={passwordValue}
          onEmailChange={onEmailchangeHandler}
          onPasswordChange={onPasswordChangeHandler}
        />
        <LoginButton onClick={loginHandler} />
        <div className="w-full flex items-center list-none mx-12 text-xs mt-4 text-slate-400 space-x-4">
          <li className="pr-8 border-r border-slate-400">아이디 찾기</li>
          <div className=" border-1 border-slate-400 h-6"></div>
          <li className="pr-8 border-r border-slate-400">비밀번호 찾기</li>
          <div className=" border-1 border-slate-400 h-6"></div>
          <li>회원가입</li>
        </div>
      </div>
      <div className="text-slate-400 mt-16 text-sm flex items-center">
        <hr className="flex-grow border-slate-400 mx-3"></hr>
        간편 로그인
        <hr className="flex-grow border-slate-400 mx-3"></hr>
      </div>
      <SocialButton title={"Naver"} bgColor={"#17CE5F"} txtColor={"white"} />
      <SocialButton title={"Kakao"} bgColor={"#FAE100"} txtColor={"black"} />
    </Layout>
  );
};

export default LoginPage;
