import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserProfile from "./UserProfile";
import SlidingMenu from "../../ui/SlidingMenu";
import UserArtPieceListWrapper from "./UserArtPieceListWrapper";
import UserLikedArtPieceListWrapper from "./UserLikedArtPieceListWrapper";
import UserAuctionListWrapper from "./UserAuctionListWrapper";
import UserLiveAuctionListWrapper from "./UserLiveAuctionListWrapper";
import UserFinishAuctionListWrapper from "./UserFinishAuctionListWrapper";

const UserContent = () => {
  const userId = useParams().userId;
  const menus = ["예술품", "경매"];
  const [selectedMenu, setSelectedMenu] = useState(menus[0]);

  // 유저가 다른 유저의 프로필을 볼 때 : 해당 유저의 예술품 , 경매중인 예술품
  // 유저가 자신의 프로필을 볼 때 : 내 예술품 , 내 경매

  useEffect(() => {
    // 유저 정보 불러오기
  }, []);
  return (
    <>
      <UserProfile />
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
          <UserFinishAuctionListWrapper userId={userId} />
          <UserLiveAuctionListWrapper userId={userId} />
        </>
      )}
    </>
  );
};

export default UserContent;
