import { useEffect } from "react";

import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsChevronCompactUp, BsHeartFill } from "react-icons/bs";
import { useStore } from "zustand";
import { useAnimationStore } from "../../../../store/store";
import { AuctionInfo } from "../../../../types/auction.type";

import { postAuctionLike } from "../../../../api/auction.api";
import RoundButton from "../../../ui/RoundButton";
import RotationButton from "../../../ui/RotationButton";
import DetailFooterExpanded from "./DetailFooterExpanded";
import DetailFooterFolded from "./DetailFooterFolded";

interface DetailFooterProps {
  onPublishClick: (body: { bidderId: number; bidPrice: number }) => void;
  onBidChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBidSet: (value: number) => void;
  auctionInfo: AuctionInfo;
  bidPrice: number;
  bidderId: number;
}

const DetailFooter = (props: DetailFooterProps) => {
  const useAnimation = useStore(useAnimationStore);
  const [isExpanded, setIsExpanded] = useState(false);

  // const isLike = props.auctionInfo.likeMembers.includes(1);
  const isLike = false;

  const changeExpandedHandler = () => {
    setIsExpanded((prev) => !prev);
  };

  const fetchData = async () => {
    const response = await postAuctionLike(
      props.auctionInfo.id,
      props.bidderId
    );

    console.log(response.data);
    return response.data;
  };

  const clickHeartHandler = () => {
    if (!useAnimation.isShow) {
      useAnimation.showAnimation();
      mutate();
    }
  };
  const { data, mutate } = useMutation(fetchData);

  const publishClickHandler = () => {
    if (props.bidPrice > props.auctionInfo.currentPrice) {
      props.onPublishClick({
        bidderId: props.bidderId,
        bidPrice: props.bidPrice,
      });
    }
  };

  return (
    <motion.footer
      initial={{
        translateY: "3rem",
      }}
      animate={{
        translateY: isExpanded ? "0rem" : "3rem",
      }}
      transition={{ duration: 0.4 }}
      className="flex flex-col shrink-0 fixed bottom-0 z-50  items-center w-full max-w-[400px] h-60 bg-af-brightGray rounded-t-3xl gap-4 font-Pretendard"
    >
      <RotationButton
        isExpanded={isExpanded}
        onChangeisExpanded={changeExpandedHandler}
      >
        <BsChevronCompactUp size={24} />
      </RotationButton>

      {/* 접혀있을 때 */}
      {isExpanded && <DetailFooterExpanded {...props} />}
      {/* 펼쳤을 때 */}
      {!isExpanded && <DetailFooterFolded {...props} />}

      <div className="flex w-full h-12 justify-evenly">
        <button
          onClick={clickHeartHandler}
          className={
            isLike
              ? "btn w-12 flex justify-center items-center border bg-af-hotPink   border-af-hotPink"
              : "btn w-12 flex justify-center items-center border bg-transparent  border-af-hotPink hover:bg-transparent hover:border-af-hotPink"
          }
        >
          <BsHeartFill
            size={24}
            className={isLike ? "fill-white " : "fill-af-hotPink "}
          />
        </button>
        <RoundButton
          className="w-1/2"
          onClick={isExpanded ? changeExpandedHandler : publishClickHandler}
        >
          입찰하기
        </RoundButton>
      </div>
    </motion.footer>
  );
};

export default DetailFooter;
