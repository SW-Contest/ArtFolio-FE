import React from "react";
import Layout from "../components/ui/Layout";
import Header from "../components/ui/Header";
import UserIcon from "../components/ui/UserIcon";

import { motion } from "framer-motion";
import { useState } from "react";
import ListWrapper from "../components/auction/list/AuctionListWrapper";
import SlidingMenu from "../components/ui/SlidingMenu";

const UserPage = () => {
  const menus = ["경매 중 작품", "경매 완료 작품"];
  const [selectedMenu, setSelectedMenu] = useState("경매 중 작품");

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
        <MotionButton className="px-2 py-1 text-white border-0 rounded-full  bg-af-hotPink">
          Follow
        </MotionButton>
      </article>

      <SlidingMenu
        menus={menus}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <ListWrapper />
    </Layout>
  );
};

export default UserPage;
