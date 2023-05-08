import React from "react";

interface CircleButtonProps {
  size?: string;
  children: React.ReactNode;
}

const CircleButton = (props: CircleButtonProps) => {
  return (
    <button className="px-2 py-1 text-sm font-medium text-white grow-0 bg-af-hotPink font-Pretendard rounded-xl">
      {props.children}
    </button>
  );
};

export default CircleButton;
