import { useEffect, useRef } from "react";

import {
  BsChevronCompactDown,
  BsChevronCompactUp,
  BsHeartFill,
} from "react-icons/bs";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeartAnimation from "../ui/HeartAnimation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AuctionInfo } from "../../types/auction.type";
import { useAnimationStore } from "../../store/store";
import { useStore } from "zustand";

import MotionButton from "../ui/MotionButton";
import { postAuctionLike } from "../../api/auction.api";

interface DetailFooterProps {
  onPublishClick: () => void;
  onBidChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBidSet: (value: number) => void;
  auctionInfo: AuctionInfo;
  bidPrice: number;
}

const DetailFooter = (props: DetailFooterProps) => {
  const useAnimation = useStore(useAnimationStore);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isShowHeart, setIsShowHeart] = useState(false);
  const [time, setTime] = useState("");

  const isLike = props.auctionInfo.likeMembers.includes(1);

  const tick = () => {
    setTime(() => getTimeLeft());
  };

  // 경매 종료 남은 시간을 갱신합니다.
  useEffect(() => {
    tick();
    const timeId = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(timeId);
    };
  }, []);

  const getTimeLeft = () => {
    const curTime = new Date();
    const endTime = new Date(props.auctionInfo.finishedAt);
    const timeDiff = Math.abs(curTime.getTime() - endTime.getTime());
    let hours: string | number = Math.floor(timeDiff / 3600000);
    let minutes: string | number = Math.floor((timeDiff % 3600000) / 60000);
    let seconds: string | number = Math.floor((timeDiff % 60000) / 1000);

    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;
    if (hours < 10) hours = `0${hours}`;

    const timeLeft = hours + ":" + minutes + ":" + seconds;

    return timeLeft;
  };

  const changeCollapsedHandler = () => {
    setIsCollapsed((prev) => !prev);
  };

  const fetchData = async () => {
    const response = await postAuctionLike(props.auctionInfo.id, 1);
    return response.data;
  };

  const clickHeartHandler = () => {
    if (!useAnimation.isShow) {
      useAnimation.showAnimation();
      mutate();
    }
  };
  const { data, mutate } = useMutation(fetchData);

  return (
    <motion.footer
      initial={{
        translateY: "3rem",
      }}
      animate={{
        translateY: isCollapsed ? "3rem" : "0rem",
      }}
      transition={{ duration: 0.4 }}
      className="flex flex-col shrink-0 fixed   bottom-0 z-50  items-center w-full max-w-[400px] h-60 bg-af-brightGray rounded-t-3xl gap-4 font-Pretendard"
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

      {!isCollapsed && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col w-full gap-4"
        >
          <div className="flex w-full h-10 justify-evenly">
            <MotionButton onClick={() => props.onBidSet(props.bidPrice - 1)}>
              <AiOutlineMinus size={24} />
            </MotionButton>
            <motion.input
              key={props.auctionInfo.currentPrice}
              initial={{ color: "#000000" }}
              animate={{ color: ["#FF008A", "#000000"] }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="text-2xl font-semibold text-center bg-transparent"
              onChange={props.onBidChange}
              value={props.bidPrice}
            />
            <MotionButton onClick={() => props.onBidSet(props.bidPrice + 1)}>
              <AiOutlinePlus size={24} />
            </MotionButton>
          </div>
          <div className="flex w-full h-10 justify-evenly">
            <MotionButton
              onClick={() => props.onBidSet(props.bidPrice + 1000)}
              className="px-3 border border-gray-300 rounded-lg"
            >
              +1천원
            </MotionButton>
            <MotionButton
              onClick={() => props.onBidSet(props.bidPrice + 10000)}
              className="px-3 border border-gray-300 rounded-lg"
            >
              +1만원
            </MotionButton>
            <MotionButton
              onClick={() => props.onBidSet(props.bidPrice + 50000)}
              className="px-3 border border-gray-300 rounded-lg"
            >
              +5만원
            </MotionButton>
            <MotionButton
              onClick={() => props.onBidSet(props.auctionInfo.currentPrice)}
              className="px-3 border border-gray-300 rounded-lg"
            >
              현재가
            </MotionButton>
          </div>
        </motion.section>
      )}
      {isCollapsed && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center w-full"
        >
          <p className="font-normal text-black text-md">
            경매 종료까지 남은 시간
          </p>
          <p className="h-10 text-4xl font-semibold text-center text-af-hotPink">
            {time}
          </p>
        </motion.section>
      )}

      <div className="flex w-full h-12  justify-evenly">
        <MotionButton
          onClick={clickHeartHandler}
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
        </MotionButton>
        <MotionButton
          onClick={isCollapsed ? changeCollapsedHandler : props.onPublishClick}
          className="w-1/2 text-white border-0 rounded-lg bg-af-hotPink hover:bg-af-hotPink"
        >
          입찰하기
        </MotionButton>
      </div>
    </motion.footer>
  );
};

export default DetailFooter;
