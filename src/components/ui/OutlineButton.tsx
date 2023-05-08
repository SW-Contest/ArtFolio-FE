import React from "react";

interface OutlineButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

const OutlineButton = (props: OutlineButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className="px-6 py-2 text-sm  rounded-xl"
      type="button"
    >
      {props.children}
    </button>
  );
};

export default OutlineButton;
