import React from "react";

interface BidButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

const BidButton = (props: BidButtonProps) => {
  let classes = "bg-red-500 px-4 py-2 rounded-xl w-72 h-12";
  return (
    <button
      onClick={props.onClick}
      className="bg-red-500 px-4  rounded-xl w-72 h-12 flex items-center gap-1"
      type="button"
    >
      <p className=" text-white">입찰하기</p>
      <div className="w-2 h-full border-r border-red-600" />
      <div className="flex justify-center grow">
        <p className="text-white">{props.children} 원</p>
      </div>
    </button>
  );
};

export default BidButton;
