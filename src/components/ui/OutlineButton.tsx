import React from "react";

interface OutlineButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

const OutlineButton = (props: OutlineButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className="bg-white p-2 rounded-xl w-full h-12 border text-sm"
      type="button"
    >
      {props.children}
    </button>
  );
};

export default OutlineButton;
