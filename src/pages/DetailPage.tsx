import Layout from "../components/ui/Layout";
import { useParams } from "react-router-dom";
import Header from "../components/ui/Header";

import DetailCarousel from "../components/auction/detail/DetailCarousel";

import { useEffect, useState, useRef } from "react";

import DetailFooter from "../components/auction/detail/DetailFooter";
import { useQuery } from "@tanstack/react-query";
import { AuctionDetail } from "../types/auction.type";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import HeartAnimation from "../components/ui/HeartAnimation";
import { getAuctionDetail, getMockAuctionDetail } from "../api/auction.api";
import DetailContent from "../components/auction/detail/DetailContent/DetailContent";
import useAuctionSocket from "../hooks/useAuctionSocket";
import * as StompJs from "@stomp/stompjs";
import { HOST } from "../constants/host";

const DetailPage = () => {
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
    if (data) {
      if (value >= data.auctionInfo.currentPrice) {
        setBidPrice(value);
      }
    }
  };

  if (data && auctionInfo && artistInfo && bidderInfos) {
    return (
      <Layout>
        <Header />
        <HeartAnimation />
        <DetailCarousel photoPaths={auctionInfo.photoPaths ?? []} />

        {/* <input onChange={tempBidderChangeHandler} /> */}
        <DetailContent
          auctionInfo={auctionInfo}
          artistInfo={artistInfo}
          bidderInfos={bidderInfos}
        />
        <DetailFooter
          bidderId={bidderId}
          onPublishClick={publish}
          onBidChange={bidChangeHandler}
          onBidSet={bidSetHandler}
          auctionInfo={auctionInfo}
          bidPrice={bidPrice}
        />
      </Layout>
    );
  } else {
    // 데이터 받아오기전에 로딩스피너 보여줌
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }
};

export default DetailPage;
