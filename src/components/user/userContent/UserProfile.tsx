import UserIcon from "../../common/user/UserIcon";
import UserFollow from "./UserFollow";
import { ArtistInfo } from "../../../types/auction.type";
import { useUserStore } from "../../../store/store";

interface UserProfileProps {
  artistInfo: ArtistInfo;
}

const UserProfile = ({ artistInfo }: UserProfileProps) => {
  const { userId } = useUserStore();
  console.log(typeof userId);
  console.log(typeof artistInfo.id);

  if (!userId) return <></>;

  const isOwner = userId === artistInfo.id;
  console.log(isOwner);

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
