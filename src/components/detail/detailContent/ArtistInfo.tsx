import UserIcon from "../../ui/UserIcon";
import { ArtistInfo } from "../../../types/auction.type";
import RoundButton from "../../ui/RoundButton";

interface ArtistInfoProps {
  artistInfo: ArtistInfo;
}
const ArtistInfo = (props: ArtistInfoProps) => {
  const clickArtistHomeHandler = () => {};
  return (
    <article className="flex items-center w-full gap-4 p-4 mb-4 rounded-md bg-af-lightGray">
      <UserIcon url="/src/assets/img/cat.jpeg" />
      <div className="flex flex-col justify-between grow">
        <p className="text-sm font-bold truncate ">{props.artistInfo.name}</p>

        <p className="text-xs font-light">팔로우 {}</p>
      </div>
      <RoundButton onClick={clickArtistHomeHandler}>작가 Home</RoundButton>
    </article>
  );
};

export default ArtistInfo;
