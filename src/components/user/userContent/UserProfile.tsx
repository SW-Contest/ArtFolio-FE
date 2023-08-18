import UserIcon from "../../common/user/UserIcon";
import UserFollow from "./UserFollow";
import { ArtistInfo } from "../../../types/auction.type";
import { useUserStore } from "../../../store/store";

interface UserProfileProps {
  artistInfo: ArtistInfo;
}

const UserProfile = ({ artistInfo }: UserProfileProps) => {
  const { userId } = useUserStore();

  if (!userId) return <></>;

  // 접속한 유저와 해당 프로필의 유저가 같은지 확인합니다.
  const isOwner = userId === artistInfo.id;

  return (
    <article className="flex flex-col items-center w-full gap-3 ">
      <div className="flex justify-center w-full">
        <UserIcon url={artistInfo.photoPath!} large />
      </div>
      <div className="flex flex-col items-center gap-3">
        <p className="text-2xl font-bold truncate ">{artistInfo.name}</p>
        <p className="text-sm font-medium truncate ">{artistInfo.content}</p>
      </div>
      {!isOwner && <UserFollow artistInfo={artistInfo} />}
    </article>
  );
};

export default UserProfile;
