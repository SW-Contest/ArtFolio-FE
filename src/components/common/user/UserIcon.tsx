import React from "react";

interface UserIconProps {
  large?: boolean;
  url: string;
}
const UserIcon = (props: UserIconProps) => {
  let styles =
    "shrink-0 flex items-center justify-end rounded-full overflow-hidden w-10 h-10 ";

  if (props.large) {
    styles =
      "shrink-0 flex items-center justify-end rounded-full overflow-hidden w-24 h-24 ";
  }
  return (
    <div className={styles}>
      <img src={props.url} className="w-full h-full object-cover" />
    </div>
  );
};

export default UserIcon;
