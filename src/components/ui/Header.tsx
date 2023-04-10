import React from "react";
import { BsBell } from "react-icons/bs";

const Header = () => {
  return (
    <header className="z-50 flex p-2 justify-end shrink-0 w-full h-10 bg-white sticky top-0">
      <BsBell size={24} />
    </header>
  );
};

export default Header;
