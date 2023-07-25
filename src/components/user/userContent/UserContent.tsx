import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserProfile from "./UserProfile";
import SlidingMenu from "../../ui/SlidingMenu";
import UserAuctionListWrapper from "./UserAuctionListWrapper";
import UserLikedArtPieceListWrapper from "./UserLikedArtPieceListWrapper";

const UserContent = () => {
  const userId = useParams().userId;
  const menus = ["예술 작품", "경매 작품"];
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

      <UserAuctionListWrapper userId={userId} />
      <UserLikedArtPieceListWrapper userId={userId} />
    </>
  );
};

export default UserContent;
