import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import { BsChevronCompactUp, BsHeartFill } from "react-icons/bs";
import { useStore } from "zustand";
import { useAnimationStore } from "../../../../store/store";

import { postAuctionLike } from "../../../../api/auction.api";
import RoundButton from "../../../ui/RoundButton";
import RotationButton from "../../../ui/RotationButton";
import DetailFooterExpanded from "./DetailFooterExpanded";
import DetailFooterFolded from "./DetailFooterFolded";
import useAuctionSocket from "../../../../hooks/useAuctionSocket";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuctionDetail } from "../../../../types/auction.type";
import {
  getAuctionDetail,
  getMockAuctionDetail,
} from "../../../../api/auction.api";
import { matchPath, useLocation } from "react-router-dom";

const DetailFooter = () => {
  const location = useLocation();
  const auctionId = location.pathname.split("/")[2];
  const useAnimation = useStore(useAnimationStore);
  const [bidderId, setBidderId] = useState(1);
  const [bidPrice, setBidPrice] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // const isLike = props.auctionInfo.likeMembers.includes(1);
  const isLike = false;

  const fetchAuctionDetail = async () => {
    const response = await getAuctionDetail(auctionId);
    return response.data;
  };

  const { data, isFetching, refetch } = useQuery<AuctionDetail>(
    [auctionId],
    fetchAuctionDetail,
    {
      enabled: !!auctionId,
    }
  );

  const { artistInfo, auctionInfo, bidderInfos } = data ?? {};

  useEffect(() => {
    if (data && auctionInfo) {
      setBidPrice(auctionInfo.currentPrice);
    }
  }, [data]);

  const [publish] = useAuctionSocket(auctionId, refetch);

  const changeExpandedHandler = () => {
    setIsExpanded((prev) => !prev);
  };

  const fetchData = async () => {
    // const response = await postAuctionLike(
    //   props.auctionInfo.id,
    //   props.bidderId
    // );
    // console.log(response.data);
    // return response.data;
  };

  const clickHeartHandler = () => {
    if (!useAnimation.isShow) {
      useAnimation.showAnimation();
      mutate();
    }
  };
  const { data: likeData, mutate } = useMutation(fetchData);

  const publishClickHandler = () => {
    if (data && auctionInfo) {
      if (bidPrice > auctionInfo.currentPrice) {
        publish({
          bidderId: bidderId,
          bidPrice: bidPrice,
        });
      }
    }
  };

  // input의 onChange에 할당되는 함수
  const bidChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBidPrice = Number(e.target.value);
    setBidPrice(newBidPrice);
  };

  // 경매가 변경 함수
  const bidSetHandler = (value: number) => {
    setBidPrice(value);
  };

  return (
    <motion.footer
      initial={{
        y: "15rem",
      }}
      animate={{
        y: isExpanded ? "0rem" : "3rem",
      }}
      transition={{ duration: 0.4 }}
      exit={{
        y: "15rem",
      }}
      className="flex flex-col shrink-0 fixed bottom-0 z-50 items-center w-full max-w-[400px] h-60 bg-af-brightGray rounded-t-3xl gap-4 font-Pretendard"
    >
      <RotationButton
        isExpanded={isExpanded}
        onChangeisExpanded={changeExpandedHandler}
      >
        <BsChevronCompactUp size={24} />
      </RotationButton>

      {/* 펼쳤을 때 */}
      {auctionInfo && isExpanded && (
        <DetailFooterExpanded
          onBidChange={bidChangeHandler}
          onBidSet={bidSetHandler}
          auctionInfo={auctionInfo}
          bidPrice={bidPrice}
        />
      )}
      {/* 접혔을 때 */}
      {auctionInfo && !isExpanded && (
        <DetailFooterFolded auctionInfo={auctionInfo!} />
      )}

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
          onClick={isExpanded ? publishClickHandler : changeExpandedHandler}
        >
          입찰하기
        </RoundButton>
      </div>
    </motion.footer>
  );
};

export default DetailFooter;
