import React from "react";
import Layout from "../components/ui/Layout";
import Header from "../components/ui/Header";
import UserIcon from "../components/ui/UserIcon";
import MotionButton from "../components/ui/MotionButton";
import { motion } from "framer-motion";
import { useState } from "react";
import ListWrapper from "../components/list/ListWrapper";

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
          <p className="text-sm font-bold truncate ">이름</p>
          <p className="text-sm font-light truncate ">
            한 줄 소개가 들어갑니다.
          </p>
        </div>
        <MotionButton className="px-2 py-1 text-white border-0 rounded-full  bg-af-hotPink">
          Follow
        </MotionButton>
      </article>

      <ul className="flex w-full">
        {menus.map((item) => (
          <li
            key={item}
            className={
              item === selectedMenu
                ? "relative flex grow  text-red-500"
                : "relative flex grow "
            }
            onClick={() => setSelectedMenu(item)}
          >
            <div className="w-full text-center border-b">{item}</div>

            {item === selectedMenu ? (
              <motion.div
                className=" z-10 w-full absolute bottom-0 border-b border-red-500 "
                layoutId="underline"
              />
            ) : null}
          </li>
        ))}
      </ul>
      <ListWrapper />
    </Layout>
  );
};

export default UserPage;
