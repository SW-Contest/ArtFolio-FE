import { twMerge } from "tailwind-merge";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { BsChevronCompactUp, BsHeartFill } from "react-icons/bs";
import { useStore } from "zustand";
import { useAnimationStore, useUserStore } from "../../../../store/store";

import { postAuctionLike } from "../../../../api/auction.api";
import useAuctionSocket from "../../../../hooks/useAuctionSocket";
import RotationButton from "../../../common/RotationButton";
import RoundButton from "../../../common/RoundButton";
import DetailFooterExpanded from "./DetailFooterExpanded";
import DetailFooterFolded from "./DetailFooterFolded";

import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import {
  getAuctionDetail,
  getAuctionLikedMember,
} from "../../../../api/auction.api";
import {
  AuctionDetail,
  AuctionLikedMember,
} from "../../../../types/auction.type";

const DetailFooter = () => {
  const location = useLocation();

  const useAnimation = useStore(useAnimationStore);
  const [auctionId, setAuctionId] = useState(location.pathname.split("/")[2]);
  const [bidPrice, setBidPrice] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const { userId } = useUserStore();

  // 경매 상세 정보를 가져옵니다.
  const fetchAuctionDetail = async () => {
    const response = await getAuctionDetail(auctionId);
    return response.data;
  };

  // 경매 상세 정보를 관리하는 쿼리
  const { data: auctionData, refetch: auctionRefetch } =
    useQuery<AuctionDetail>(["auctionDetail" + auctionId], fetchAuctionDetail, {
      enabled: !!auctionId,
    });

  // 경매를 좋아요 한 유저 정보를 가져옵니다.
  const fetchAuctionLikedMemeber = async () => {
    const response = await getAuctionLikedMember(auctionId);
    return response.data;
  };

  // 경매를 좋아요 한 유저 정보를 관리하는 쿼리
  const { data: auctionLikeMemberData, refetch: auctionLikeMemberRefetch } =
    useQuery<AuctionLikedMember>(
      ["likeMember" + auctionId],
      fetchAuctionLikedMemeber,
      {
        enabled: !!auctionId,
      }
    );

  const { auctionInfo, artistInfo } = auctionData ?? {};

  // 해당 경매가 접속한 유저의 경매인지 확인합니다.
  const isOwner = artistInfo?.id === userId;

  // 경매 정보가 변경되면 입찰가를 변경합니다.
  useEffect(() => {
    if (auctionData && auctionInfo) {
      setBidPrice(auctionInfo.currentPrice);
    }
  }, [auctionData]);

  // 경매 좋아요 유저 정보를 가져오고 , 해당 경매가 좋아요 된 경매인지 확인합니다.
  useEffect(() => {
    if (auctionLikeMemberData) {
      const likeMember = auctionLikeMemberData.likeUsers.filter((user) => {
        if (user.id === userId) return user;
      });

      if (likeMember.length > 0) {
        setIsLike(true);
      } else {
        setIsLike(false);
      }
    }
  }, [auctionLikeMemberData]);

  // 실시간 경매가를 위한 경매 소켓을 사용합니다.
  const [publish] = useAuctionSocket(auctionId, auctionRefetch);

  const changeExpandedHandler = () => {
    setIsExpanded((prev) => !prev);
  };

  // 경매 좋아요를 토글합니다.
  const toggleAuctionLike = async () => {
    if (auctionData && auctionInfo) {
      const response = await postAuctionLike(auctionInfo.id, userId!);
      return response.data;
    }
  };

  // 좋아오 버튼이 눌리면 애니메이션을 보여주고, 좋아요를 토글합니다.
  const clickHeartHandler = () => {
    if (!useAnimation.isShow) {
      if (!isLike) {
        useAnimation.showAnimation("heart");
      }
      mutate();
    }
  };
  const { data: likeData, mutate } = useMutation(toggleAuctionLike, {
    onSuccess: () => {
      auctionLikeMemberRefetch();
    },
  });

  // 입찰 버튼이 눌리면 입찰가를 갱신합니다.
  const publishClickHandler = () => {
    if (auctionData && auctionInfo) {
      if (bidPrice > auctionInfo.currentPrice) {
        publish({
          bidderId: userId!,
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

  if (!auctionInfo) return <></>;

  const auctionLikeMemberLength = auctionLikeMemberData?.likeUsers.length;

  if (isOwner) {
    return (
      <motion.footer
        initial={{
          y: "12rem",
        }}
        animate={{
          y: "1rem",
        }}
        transition={{ duration: 0.4 }}
        exit={{
          y: "12rem",
        }}
        className="fixed bottom-0 z-50 flex flex-col items-center justify-center w-full  h-48 gap-4 shrink-0 bg-af-brightGray rounded-t-3xl max-w-[450px] "
      >
        {/* 경매 종료까지 남은 시간만 표시 */}
        <DetailFooterFolded auctionInfo={auctionInfo!} />
        <button
          className={
            "btn btn-outline w-60 flex justify-center items-center  bg-af-hotPink   border-af-hotPink hover:bg-af-hotPink hover:border-af-hotPink"
          }
        >
          <BsHeartFill size={14} className={"fill-white "} />
          <div className={twMerge(" h-7 text-lg font-semibold", "text-white")}>
            {auctionLikeMemberLength}
          </div>
        </button>
      </motion.footer>
    );
  } else {
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
        className="fixed bottom-0 z-50 flex flex-col items-center w-full gap-4 shrink-0 h-60 bg-af-brightGray rounded-t-3xl max-w-[450px]"
      >
        <RotationButton
          isExpanded={isExpanded}
          onChangeisExpanded={changeExpandedHandler}
        >
          <BsChevronCompactUp size={24} />
        </RotationButton>

        {/* 펼쳤을 때 */}
        {isExpanded && (
          <DetailFooterExpanded
            onBidChange={bidChangeHandler}
            onBidSet={bidSetHandler}
            auctionInfo={auctionInfo}
            bidPrice={bidPrice}
          />
        )}
        {/* 접혔을 때 */}
        {!isExpanded && <DetailFooterFolded auctionInfo={auctionInfo!} />}

        <div className="flex w-full h-12 justify-evenly">
          <button
            onClick={clickHeartHandler}
            className={
              isLike
                ? "btn btn-outline w-24 flex justify-center items-center  bg-af-hotPink   border-af-hotPink hover:bg-af-hotPink hover:border-af-hotPink"
                : "btn btn-outline w-24 flex justify-center items-center  bg-transparent  border-af-hotPink hover:bg-transparent hover:border-af-hotPink"
            }
          >
            <BsHeartFill
              size={14}
              className={isLike ? "fill-white " : "fill-af-hotPink "}
            />
            <div
              className={twMerge(
                " h-7 text-lg font-semibold",
                isLike ? "text-white" : "text-af-hotPink"
              )}
            >
              {auctionLikeMemberLength}
            </div>
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
  }
};

export default DetailFooter;
