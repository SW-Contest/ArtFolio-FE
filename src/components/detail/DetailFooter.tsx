import React from "react";

import {
  BsChevronCompactDown,
  BsChevronCompactUp,
  BsHeartFill,
} from "react-icons/bs";
import { useState } from "react";
import { motion } from "framer-motion";

interface DetailFooterProps {
  onClick: () => void;
}

const DetailFooter = (props: DetailFooterProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const changeCollapsedHandler = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <>
      <motion.footer
        initial={{
          translateY: isCollapsed ? "0rem" : "8rem",
        }}
        animate={{
          translateY: isCollapsed ? "8rem" : "0rem",
        }}
        transition={{ duration: 0.4 }}
        className="flex flex-col shrink-0 fixed bottom-0 z-50  items-center w-full max-w-[400px] h-40 bg-af-brightGray rounded-t-3xl gap-2"
      >
        <motion.button
          initial={{
            rotate: 0,
          }}
          animate={{
            rotate: isCollapsed ? 180 : 0,
          }}
          transition={{ duration: 0.4 }}
          onClick={changeCollapsedHandler}
        >
          <BsChevronCompactDown size={24} />
        </motion.button>

        <p className="text-xl font-semibold  text-af-hotPink">
          현재 n명이 작품 경매에 참여하고 있어요!
        </p>

        <div className="flex justify-evenly w-full">
          <button className="group btn btn-square btn-outline hover:bg-af-hotPink border-af-hotPink hover:border-af-hotPink">
            <BsHeartFill
              size={24}
              className="fill-af-hotPink group-hover:fill-white"
            />
          </button>
          <button
            onClick={props.onClick}
            className="btn bg-af-hotPink hover:bg-af-hotPink w-1/2  border-0"
          >
            입찰하기
          </button>
        </div>
      </motion.footer>
    </>
  );
};

export default DetailFooter;
