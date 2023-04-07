import React from "react";

interface ListButtonProps {
  children: React.ReactNode;
  onClick: (changeSort: string) => void;
  sort: string;
  name: string;
}

const ListButton = (props: ListButtonProps) => {
  let classes = "bg-slate-200 px-4 py-2 rounded-lg";
  if (props.sort === props.name) {
    classes = "bg-slate-400 text-white px-4 py-2 rounded-lg";
  }
  return (
    <button
      onClick={() => {
        props.onClick(props.name);
      }}
      className={classes}
      type="button"
    >
      {props.children}
    </button>
  );
};

export default ListButton;
