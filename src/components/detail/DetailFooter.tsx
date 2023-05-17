import React from "react";

import {
  BsChevronCompactDown,
  BsChevronCompactUp,
  BsHeartFill,
} from "react-icons/bs";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeartAnimation from "../ui/HeartAnimation";
import { useMutation } from "@tanstack/react-query";
import axios from "Axios";
import { auctionInfoProps } from "../../mocks/dummyList";

interface DetailFooterProps {
  onPublishClick: () => void;
  onBidChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  auctionInfo: auctionInfoProps;
}

const DetailFooter = (props: DetailFooterProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isShowHeart, setIsShowHeart] = useState(false);

  const isLike = true;

  const changeCollapsedHandler = () => {
    setIsCollapsed((prev) => !prev);
  };

  const changeShowHeartHandler = () => {
    setIsShowHeart((prev) => !prev);
  };

  const fetchData = async () => {
    const res = await axios.post("http://20.249.220.42:8080/rt_auction/like", {
      auctionId: "bc5b8c6f-8802-4042-873a-96b34f053a24",
      memberId: 1,
    });
    return res.data;
  };

  const { data, mutate } = useMutation(fetchData);
  return (
    <>
      <HeartAnimation
        isShow={isShowHeart}
        changeShow={changeShowHeartHandler}
      />
      <motion.footer
        initial={{
          translateY: "6rem",
        }}
        animate={{
          translateY: isCollapsed ? "6rem" : "0rem",
        }}
        transition={{ duration: 0.4 }}
        className="flex flex-col shrink-0 fixed bottom-0 z-50  items-center w-full max-w-[400px] h-60 bg-af-brightGray rounded-t-3xl gap-2"
      >
        <motion.button
          initial={{
            rotate: 0,
          }}
          animate={{
            rotate: isCollapsed ? 0 : 180,
          }}
          transition={{ duration: 0.4 }}
          onClick={changeCollapsedHandler}
        >
          <BsChevronCompactUp size={24} />
        </motion.button>

        <AnimatePresence>
          {!isCollapsed && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <div className="flex w-full h-10 justify-evenly">
                <button>-</button>
                <input
                  className="text-center"
                  onChange={props.onBidChange}
                  defaultValue={props.auctionInfo.currentPrice}
                />
                <button>+</button>
              </div>
              <div className="flex w-full h-10 justify-evenly">
                <button>+1천원</button>
                <button>+1만원</button>
                <button>+5만원</button>
                <button>+10만원</button>
                <button>2배</button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <motion.div
          className="absolute flex flex-col gap-2"
          initial={{
            translateY: "2rem",
          }}
          animate={{
            translateY: isCollapsed ? "2rem" : "8rem",
          }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xl font-semibold text-af-hotPink">
            현재 n명이 작품 경매에 참여하고 있어요!
          </p>

          <div className="flex w-full h-12 justify-evenly">
            <motion.button
              onClick={() => changeShowHeartHandler()}
              initial={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={
                isLike
                  ? "w-12 group rounded-lg flex justify-center items-center border bg-af-hotPink   border-af-hotPink"
                  : "w-12 group rounded-lg flex justify-center items-center border bg-transparent  border-af-hotPink"
              }
            >
              <BsHeartFill
                size={24}
                className={isLike ? "fill-white " : "fill-af-hotPink "}
              />
            </motion.button>
            <motion.button
              onClick={props.onPublishClick}
              initial={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="w-1/2 text-white border-0 rounded-lg  bg-af-hotPink hover:bg-af-hotPink"
            >
              입찰하기
            </motion.button>
          </div>
        </motion.div>
      </motion.footer>
    </>
  );
};

export default DetailFooter;
