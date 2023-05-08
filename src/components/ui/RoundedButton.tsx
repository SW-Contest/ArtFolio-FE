import React from "react";

interface RoundedButtonProps {
  size?: string;
  children: React.ReactNode;
}
const RoundedButton = (props: RoundedButtonProps) => {
  return (
    <button className="w-full py-2 text-sm font-medium text-white bg-af-hotPink font-Pretendard rounded-lg">
      {props.children}
    </button>
  );
};

export default RoundedButton;
