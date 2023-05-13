import React from "react";
import { BsShare, BsArrowLeft } from "react-icons/bs";

const Header = () => {
  return (
    <header className="z-50 flex p-2 justify-between shrink-0 w-full max-w-[400px] h-10 bg-white fixed top-0">
      <div className="flex">
        <BsArrowLeft size={24} />
      </div>
      <div className="flex gap-3">
        <BsShare size={24} />
      </div>
    </header>
  );
};

export default Header;
