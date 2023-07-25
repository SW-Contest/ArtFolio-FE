import React from "react";
import AuctionTitle from "./AuctionTitle";
import ArtistInfo from "./ArtistInfo";
import AuctionContent from "./AuctionContent";
import BidList from "./BidList";
import DetailCarousel from "./DetailCarousel";
import DetailFooter from "./detailFooter/DetailFooter";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuctionDetail } from "../../../../api/auction.api";
import { useQuery } from "@tanstack/react-query";
import { AuctionDetail } from "../../../../types/auction.type";
import useAuctionSocket from "../../../../hooks/useAuctionSocket";
import LoadingSpinner from "../../../ui/LoadingSpinner";

const DetailContent = () => {
  const [bidderId, setBidderId] = useState(1);
  const [bidPrice, setBidPrice] = useState(0);
  const auctionId = useParams().auctionId;
  const fetchAuctionDetail = async () => {
    const response = await getAuctionDetail(auctionId);
    return response.data;
  };

  const { data, isFetching, refetch } = useQuery<AuctionDetail>(
    [auctionId],
    fetchAuctionDetail
  );

  const [publish] = useAuctionSocket(auctionId, refetch);

  const { artistInfo, auctionInfo, bidderInfos } = data ?? {};

  useEffect(() => {
    if (data) {
      console.log(data);
      setBidPrice(data.auctionInfo.currentPrice);
    }
  }, [data]);

  // 웹소켓 테스트용 bidder 변경 함수
  const tempBidderChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBidderId(Number(e.target.value));
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
  if (data && artistInfo && auctionInfo && bidderInfos) {
    return (
      <section className="flex flex-col mb-40 font-Pretendard">
        <DetailCarousel photoPaths={auctionInfo.photoPaths ?? []} />
        <div className="p-2">
          <AuctionTitle auctionInfo={auctionInfo} />
          <ArtistInfo artistInfo={artistInfo} />
          <AuctionContent auctionInfo={auctionInfo} />
          <BidList auctionInfo={auctionInfo} bidderInfos={bidderInfos} />
        </div>

        <DetailFooter
          onPublishClick={publish}
          onBidChange={bidChangeHandler}
          onBidSet={bidSetHandler}
          auctionInfo={auctionInfo}
          bidPrice={bidPrice}
          bidderId={bidderId}
        />
      </section>
    );
  } else {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }
};

export default DetailContent;
