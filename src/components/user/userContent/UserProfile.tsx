import UserIcon from "../../ui/UserIcon";
import RoundButton from "../../ui/RoundButton";

const UserProfile = () => {
  return (
    <article className="flex flex-col items-center w-full gap-3">
      <div className="flex justify-center w-full">
        <UserIcon url="/src/assets/img/cat.jpeg" large />
      </div>
      <div className="flex flex-col items-center gap-3">
        <p className="text-2xl font-bold truncate ">이름</p>
        <p className="text-sm font-medium truncate ">
          한 줄 소개가 들어갑니다.
        </p>
      </div>
      <RoundButton onClick={() => {}}>Follow</RoundButton>
    </article>
  );
};

export default UserProfile;
