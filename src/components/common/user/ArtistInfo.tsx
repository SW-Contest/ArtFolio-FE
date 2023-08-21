import UserIcon from "./UserIcon";
import { ArtistInfo } from "../../../types/auction.type";
import RoundButton from "../RoundButton";
import TransitionLink from "../TransitionLink";
import { getUserFollowList } from "../../../api/user.api";
import { useQuery } from "@tanstack/react-query";
import { UserFollowList } from "../../../types/user.type";

interface ArtistInfoProps {
  artistInfo: ArtistInfo;
}
const ArtistInfo = ({ artistInfo }: ArtistInfoProps) => {
  const { data: userFollowListData } = useQuery<UserFollowList>(
    [artistInfo.id + "userFollowList"],
    () => getUserFollowList(String(artistInfo.id))
  );

  const userFollower = userFollowListData?.followerInfos.length;
  return (
    <article className="flex items-center w-full gap-4 p-4 mb-4 rounded-md bg-af-lightGray ">
      <UserIcon url={artistInfo.photoPath} />
      <div className="flex flex-col justify-between min-w-0 grow">
        <p className="text-sm font-bold truncate ">{artistInfo.nickname}</p>
        <p className="text-sm font-bold truncate ">{artistInfo.name}</p>
        <p className="text-xs font-light">팔로우 {userFollower}</p>
      </div>
      <TransitionLink to={`/user/${artistInfo.id}`}>
        <RoundButton className=" w-24">자세히 보기</RoundButton>
      </TransitionLink>
    </article>
  );
};

export default ArtistInfo;
