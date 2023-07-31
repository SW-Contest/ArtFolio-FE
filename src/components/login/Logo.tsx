import React from "react";
import Layout from "../common/Layout";
import LogoImg from "/src/assets/img/logoImg.png";

const Logo = () => {
  return (
    <div className="flex jusify-center">
      <img src={LogoImg} alt="Logo" className="w-64 h-100 mx-auto mt-10" />
    </div>
  );
};

export default Logo;
