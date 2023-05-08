import React from "react";
import OutlineButton from "../ui/OutlineButton";
import RoundedButton from "../ui/RoundedButton";
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
          className="flex flex-col shrink-0 absolute bottom-0 z-50  items-center w-[400px] h-10 bg-af-brightGray rounded-t-3xl gap-2 "
        >
          <OutlineButton onClick={changeCollapsedHandler}>
            <BsChevronCompactUp size={24} />
          </OutlineButton>
        </motion.footer>
      ) : (
        <motion.footer
          initial={{ height: "2.5rem" }}
          animate={{ height: "10rem" }}
          transition={{ duration: 0.2 }}
          className="flex flex-col shrink-0 absolute bottom-0 z-50  items-center w-[400px] h-40 bg-af-brightGray rounded-t-3xl gap-2 "
        >
          <OutlineButton onClick={changeCollapsedHandler}>
            <BsChevronCompactDown size={24} />
          </OutlineButton>

          <p className="text-xl font-semibold  text-af-hotPink">
            현재 n명이 작품 경매에 참여하고 있어요!
          </p>

          {/* <div className="flex justify-evenly w-full ">
      <div className="w-1/6 ">
        <RoundedButton color="dimGray">
          <BsArrowUp size={24} />
        </RoundedButton>
      </div>
      <div className="w-1/2 ">
        <RoundedButton color="dimGray">7000원</RoundedButton>
      </div>
      <div className="w-1/6 ">
        <RoundedButton color="dimGray">
          <BsArrowDown size={24} />
        </RoundedButton>
      </div>
    </div> */}
          <div className="flex w-2/4">
            <RoundedButton color="hotPink">입찰하기</RoundedButton>
          </div>
          {/* <BidButton onClick={publish}>100,000</BidButton> */}
        </motion.footer>
      )}
    </>
  );
};

export default DetailFooter;
