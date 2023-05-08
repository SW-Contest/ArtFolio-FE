import React from "react";

interface RoundedButtonProps {
  color: string;
  size?: string;
  children: React.ReactNode;
}
const RoundedButton = (props: RoundedButtonProps) => {
  let classes = "";
  if (props.color === "hotPink") {
    classes =
      "flex justify-center items-center w-full py-2 text-sm font-medium text-white bg-af-hotPink font-Pretendard rounded-lg h-full";
  } else {
    classes =
      "flex justify-center items-center w-full py-2 text-sm font-medium text-white bg-af-dimGray font-Pretendard rounded-lg h-full";
  }
  return <button className={classes}>{props.children}</button>;
};

export default RoundedButton;
