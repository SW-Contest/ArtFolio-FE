import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import Logo from "../components/login/Logo";
import NaverOauth from "../components/login/NaverOauth";
import KakaoOauth from "../components/login/KakaoOauth";
import GoogleOauth from "../components/login/GoogleOauth";

const LoginPage = () => {
  return (
    <Layout>
      <div className="bg-black h-screen pt-[150px]">
        <header>
          <Logo />
        </header>
        <div className="">
          <div className="w-full flex items-center justify-center list-none  text-xs mt-4 text-slate-400 space-x-4"></div>
        </div>
        <div className="text-slate-400 text-sm flex items-center"></div>
        <NaverOauth />
        <KakaoOauth />
        <GoogleOauth />
      </div>
    </Layout>
  );
};

export default LoginPage;
