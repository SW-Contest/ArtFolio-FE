import UserIcon from "../../common/user/UserIcon";
import RoundButton from "../../common/RoundButton";
import { ArtistInfo } from "../../../types/auction.type";

interface UserProfileProps {
  artistInfo: ArtistInfo;
}

const UserProfile = ({ artistInfo }: UserProfileProps) => {
  return (
    <article className="flex flex-col items-center w-full gap-3 ">
      <div className="flex justify-center w-full">
        <UserIcon url={artistInfo.photoPath!} large />
      </div>
      <div className="flex flex-col items-center gap-3">
        <p className="text-2xl font-bold truncate ">{artistInfo.name}</p>
        <p className="text-sm font-medium truncate ">{artistInfo.content}</p>
      </div>
      <RoundButton onClick={() => {}}>Follow</RoundButton>
    </article>
  );
};

export default UserProfile;
