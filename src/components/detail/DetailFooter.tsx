import React from "react";

import {
  BsChevronCompactDown,
  BsChevronCompactUp,
  BsHeartFill,
} from "react-icons/bs";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DetailFooterProps {
  onPublishClick: () => void;
  onBidChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentPrice: number;
}

const DetailFooter = (props: DetailFooterProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const changeCollapsedHandler = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <>
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

        {!isCollapsed && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
          >
            <div className="w-full flex justify-evenly h-10">
              <button>-</button>
              <input
                className="text-center"
                onChange={props.onBidChange}
                defaultValue={props.currentPrice}
              />
              <button>+</button>
            </div>
            <div className="w-full flex justify-evenly h-10">
              <button>+1천원</button>
              <button>+1만원</button>
              <button>+5만원</button>
              <button>+10만원</button>
              <button>2배</button>
            </div>
          </motion.section>
        )}

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
          <p className="text-xl font-semibold  text-af-hotPink">
            현재 n명이 작품 경매에 참여하고 있어요!
          </p>

          <div className="flex justify-evenly w-full h-12">
            <motion.button
              initial={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className=" w-12 group rounded-lg flex justify-center items-center border  hover:bg-af-hotPink border-af-hotPink hover:border-af-hotPink"
            >
              <BsHeartFill
                size={24}
                className="fill-af-hotPink group-hover:fill-white"
              />
            </motion.button>
            <motion.button
              onClick={props.onPublishClick}
              initial={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className=" rounded-lg text-white bg-af-hotPink hover:bg-af-hotPink w-1/2  border-0"
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
