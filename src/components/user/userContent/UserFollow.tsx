import RoundButton from "../../common/RoundButton";
import { getUserFollowerList, toggleUserFollow } from "../../../api/user.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserFollowList } from "../../../types/user.type";
import ArtistInfo from "../../common/user/ArtistInfo";
import { useUserStore } from "../../../store/store";

interface UserFollowProps {
  artistInfo: ArtistInfo;
}

const UserFollow = ({ artistInfo }: UserFollowProps) => {
  const { userId } = useUserStore();

  // 접속하고 있는 유저의 팔로우 리스트를 가져옵니다.
  const { data: userFollowlistData, refetch: fetchUserFollowList } =
    useQuery<UserFollowList>([userId + "userFollowerList"], () =>
      getUserFollowerList(String(userId))
    );

  // 유저의 팔로우를 토글합니다.
  const { mutate: toggleUserFollowMutate } = useMutation(toggleUserFollow, {
    onSuccess: () => {
      fetchUserFollowList();
    },
  });

  // 접속한 유저와 해당 유저(유저 페이지의 유저)가 팔로우 관계인지 확인합니다.
  const isFollowed = userFollowlistData?.followerInfos.some(
    (followerInfo) => followerInfo.id === artistInfo.id
  );

  const toggleUserFollowHandler = () => {
    if (userId && artistInfo) {
      toggleUserFollowMutate({
        fromUserId: userId,
        toUserId: artistInfo.id,
      });
    }
  };
  return (
    <>
      {isFollowed && (
        <RoundButton onClick={toggleUserFollowHandler}>팔로우 취소</RoundButton>
      )}
      {!isFollowed && (
        <RoundButton onClick={toggleUserFollowHandler}>팔로우</RoundButton>
      )}
    </>
  );
};

export default UserFollow;
