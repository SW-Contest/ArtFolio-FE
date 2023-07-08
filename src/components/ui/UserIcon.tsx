import React from "react";

interface UserIconProps {
  large?: boolean;
  url: string;
}
const UserIcon = (props: UserIconProps) => {
  let styles =
    "grow-0 flex items-center justify-end rounded-full overflow-hidden w-10 h-10 ";

  if (props.large) {
    styles =
      "grow-0 flex items-center justify-end rounded-full overflow-hidden w-24 h-24 ";
  }
  return (
    <div className={styles}>
      <img src={props.url} />
    </div>
  );
};

export default UserIcon;
