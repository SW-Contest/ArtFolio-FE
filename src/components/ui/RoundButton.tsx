import React from "react";
import { twMerge } from "tailwind-merge";

interface RoundButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const RoundButton = (props: RoundButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={twMerge(
        "text-white border-0 btn rounded-xl bg-af-hotPink hover:bg-af-hotPink",
        props.className
      )}
    >
      {props.children}
    </button>
  );
};

export default RoundButton;
