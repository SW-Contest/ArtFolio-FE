import React from "react";

import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";
import { useState } from "react";
import { motion } from "framer-motion";

interface DetailFooterProps {}

const DetailFooter = (props: DetailFooterProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const changeCollapsedHandler = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <>
      {isCollapsed ? (
        <motion.footer
          initial={{ height: "10rem" }}
          animate={{ height: "2.5rem" }}
          transition={{ duration: 0.2 }}
          className="flex flex-col shrink-0 absolute bottom-0 z-50  items-center w-[400px] h-10 bg-af-brightGray rounded-t-3xl gap-2"
        >
          <button onClick={changeCollapsedHandler}>
            <BsChevronCompactUp size={24} />
          </button>
        </motion.footer>
      ) : (
        <motion.footer
          initial={{ height: "2.5rem" }}
          animate={{ height: "10rem" }}
          transition={{ duration: 0.2 }}
          className="flex flex-col shrink-0 absolute bottom-0 z-50  items-center w-[400px] h-40 bg-af-brightGray rounded-t-3xl gap-2"
        >
          <button onClick={changeCollapsedHandler}>
            <BsChevronCompactDown size={24} />
          </button>

          <p className="text-xl font-semibold  text-af-hotPink">
            현재 n명이 작품 경매에 참여하고 있어요!
          </p>

          <div className="flex w-1/2 justify-center">
            <button className="btn bg-af-hotPink hover:bg-af-hotPink w-full border-0">
              입찰하기
            </button>
          </div>
          {/* <BidButton onClick={publish}>100,000</BidButton> */}
        </motion.footer>
      )}
    </>
  );
};

export default DetailFooter;
