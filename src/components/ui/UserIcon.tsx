import React from "react";

interface UserIconProps {
  size?: string;
  url: string;
}
const UserIcon = (props: UserIconProps) => {
  return (
    <div className="grow-0 flex items-center justify-end w-10 h-10 rounded-full overflow-hidden">
      <img src={props.url} />
    </div>
  );
};

export default UserIcon;
