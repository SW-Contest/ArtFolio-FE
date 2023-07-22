import Header from "../components/ui/Header";
import Layout from "../components/ui/Layout";
import RoundButton from "../components/ui/RoundButton";
import UserIcon from "../components/ui/UserIcon";

import { useState } from "react";
import SlidingMenu from "../components/ui/SlidingMenu";
import UserAuctionListWrapper from "../components/user/UserAuctionListWrapper";
import UserLikedArtPieceListWrapper from "../components/user/UserLikedArtPieceListWrapper";

const UserPage = () => {
  const menus = ["예술 작품", "경매 작품"];
  const [selectedMenu, setSelectedMenu] = useState(menus[0]);

  // 유저가 다른 유저의 프로필을 볼 때 : 해당 유저의 예술품 , 경매중인 예술품
  // 유저가 자신의 프로필을 볼 때 : 내 예술품 , 내 경매
  return (
    <Layout>
      <Header />
      <article className="flex flex-col items-center w-full gap-3">
        <div className="flex justify-center w-full mt-10">
          <UserIcon url="/src/assets/img/cat.jpeg" large />
        </div>
        <div className="flex flex-col items-center gap-3">
          <p className="text-2xl font-bold truncate ">이름</p>
          <p className="text-sm font-medium truncate ">
            한 줄 소개가 들어갑니다.
          </p>
        </div>
        <RoundButton onClick={() => {}}>Follow</RoundButton>
      </article>

      <SlidingMenu
        menus={menus}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <UserAuctionListWrapper />
      <UserLikedArtPieceListWrapper />
    </Layout>
  );
};

export default UserPage;
