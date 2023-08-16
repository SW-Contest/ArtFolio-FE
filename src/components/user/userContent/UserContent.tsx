import { useState } from "react";
import { useParams } from "react-router-dom";
import SlidingMenu from "../../common/SlidingMenu";
import UserArtPieceListWrapper from "./UserArtPieceListWrapper";
import UserFinishAuctionListWrapper from "./UserFinishAuctionListWrapper";
import UserLikedArtPieceListWrapper from "./UserLikedArtPieceListWrapper";
import UserLikedAuctionListWrapper from "./UserLikedAuctionListWrapper";
import UserLiveAuctionListWrapper from "./UserLiveAuctionListWrapper";
import UserProfile from "./UserProfile";
import { getUserInfo } from "../../../api/user.api";
import { useQuery } from "@tanstack/react-query";
import { ArtistInfo } from "../../../types/auction.type";
import { useAnimationStore } from "../../../store/store";
import UserAuctionListWrapper from "./UserAuctionListWrapper";

const UserContent = () => {
  const userId = useParams().userId;
  const menus = ["작품", "경매"];
  const [selectedMenu, setSelectedMenu] = useState(menus[0]);
  const { showAnimation, hideAnimation } = useAnimationStore();

  // 유저가 다른 유저의 프로필을 볼 때 : 해당 유저의 예술품 , 경매중인 예술품
  // 유저가 자신의 프로필을 볼 때 : 내 예술품 , 내 경매

  const fetchUserInfo = async () => {
    showAnimation("loading");
    const response = await getUserInfo(userId);
    return response.data;
  };

  const { data: artistInfo } = useQuery<ArtistInfo>(
    ["userInfo" + userId],
    fetchUserInfo,
    {
      enabled: !!userId,
      onSuccess: () => {
        hideAnimation();
      },
    }
  );
  return (
    <section className="flex flex-col mt-10">
      {artistInfo && (
        <>
          <UserProfile artistInfo={artistInfo} />
          <SlidingMenu
            menus={menus}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
          />

          {selectedMenu === menus[0] && (
            <>
              <UserArtPieceListWrapper userId={userId} />
              <UserLikedArtPieceListWrapper userId={userId} />
            </>
          )}

          {selectedMenu === menus[1] && (
            <>
              <UserAuctionListWrapper userId={userId} />
              <UserFinishAuctionListWrapper userId={userId} />
              <UserLiveAuctionListWrapper userId={userId} />
              <UserLikedAuctionListWrapper userId={userId} />
            </>
          )}
        </>
      )}
    </section>
  );
};

export default UserContent;
