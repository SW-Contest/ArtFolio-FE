import UserIcon from "../../ui/UserIcon";
import { ArtistInfo } from "../../../types/auction.type";
import RoundButton from "../../ui/RoundButton";
import TransitionLink from "../../ui/TransitionLink";

interface ArtistInfoProps {
  artistInfo: ArtistInfo;
}
const ArtistInfo = (props: ArtistInfoProps) => {
  const clickArtistHomeHandler = () => {};
  return (
    <article className="flex items-center w-full gap-4 p-4 mb-4 rounded-md bg-af-lightGray ">
      <UserIcon url={props.artistInfo.photoPath} />
      <div className="flex flex-col justify-between min-w-0 grow">
        <p className="text-sm font-bold truncate ">{props.artistInfo.name}</p>
        <p className="text-xs font-light">팔로우 {}</p>
      </div>
      <TransitionLink to={`/user/${props.artistInfo.id}`}>
        <RoundButton>자세히 보기</RoundButton>
      </TransitionLink>
    </article>
  );
};

export default ArtistInfo;
