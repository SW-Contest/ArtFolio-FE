import React from "react";
import {
  BsShare,
  BsBell,
  BsArrowLeft,
  BsHeart,
  BsHeartFill,
} from "react-icons/bs";

const Header = () => {
  return (
    <header className="z-50 flex p-2 justify-between shrink-0 w-full h-10 bg-white sticky top-0">
      <div className="flex">
        <BsArrowLeft size={24} />
      </div>
      <div className="flex gap-3">
        <BsHeart size={24} />
        <BsShare size={24} />
      </div>
    </header>
  );
};

export default Header;
