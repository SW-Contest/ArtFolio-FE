import Layout from "../components/ui/Layout";
import { useParams } from "react-router-dom";
import Header from "../components/ui/Header";

import DetailCarousel from "../components/auction/detail/DetailCarousel";

import { useEffect, useState, useRef } from "react";
import * as StompJs from "@stomp/stompjs";

import DetailFooter from "../components/auction/detail/DetailFooter";
import { useQuery } from "@tanstack/react-query";
import { AuctionDetail } from "../types/auction.type";
import BidList from "../components/auction/detail/BidList";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ArtistInfo from "../components/auction/detail/ArtistInfo";
import AuctionContent from "../components/auction/detail/AuctionContent";
import AuctionTitle from "../components/auction/detail/AuctionTitle";
import axios from "axios";
import HeartAnimation from "../components/ui/HeartAnimation";
import { getAuctionDetail, getMockAuctionDetail } from "../api/auction.api";
import { HOST } from "../constants/host";

const DetailPage = () => {
  const [bidder, setBidder] = useState(1);
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

  const { artistInfo, auctionInfo, bidderInfos } = data ?? {};

  const client = useRef<StompJs.Client | null>(null);

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: `ws://${HOST}/sock`,
      onConnect: () => {
        console.log("success");
        subscribe();
      },
    });
    client.current.activate();
  };

  const publish = () => {
    if (!client.current?.connected) return;

    client.current.publish({
      destination: "/app/price",
      body: JSON.stringify({
        auctionId: auctionId,
        bidderId: bidder,
        price: bidPrice,
      }),
    });
  };

  const subscribe = () => {
    // 정상 응답 구독 경로
    client.current?.subscribe("/topic/channel/" + auctionId, (body: any) => {
      const json_body = JSON.parse(body.body);
      console.log(json_body);

      // 웹소켓 응답이 올 시 데이터를 재요청합니다.
      refetch();
    });

    // 예외 발생시 응답 구독 경로
    client.current?.subscribe("/user/queue/errors", (body: any) => {
      const json_body = JSON.parse(body.body);
      console.log(json_body);
    });
  };

  const disconnect = () => {
    client.current?.deactivate();
  };

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
      setBidPrice(data.auctionInfo.currentPrice);
    }
  }, [data]);

  // 웹소켓 테스트용 bidder 변경 함수
  const tempBidderChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBidder(Number(e.target.value));
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
        <section className="flex flex-col p-2 mb-40 font-Pretendard">
          <AuctionTitle auctionInfo={auctionInfo} />
          <ArtistInfo artistInfo={artistInfo} />
          <AuctionContent auctionInfo={auctionInfo} />
          <BidList auctionInfo={auctionInfo} bidderInfos={bidderInfos} />
        </section>
        <DetailFooter
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
