import React from "react";
import { BsBell } from "react-icons/bs";

const Header = () => {
  return (
    <header className="flex p-2 justify-end w-full h-10 bg-white">
      <BsBell size={24} />
    </header>
  );
};

export default Header;
