import Layout from "../components/ui/Layout";
import { useParams } from "react-router-dom";
import Header from "../components/ui/Header";

import DetailCarousel from "../components/detail/DetailCarousel";

import { useEffect, useState, useRef } from "react";
import * as StompJs from "@stomp/stompjs";

import DetailFooter from "../components/detail/DetailFooter";
import { useQuery } from "@tanstack/react-query";
import { auctionDetailProps } from "../mocks/dummyList";
import BidList from "../components/detail/BidList";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ArtistInfo from "../components/detail/ArtistInfo";
import AuctionContent from "../components/detail/AuctionContent";
import AuctionTitle from "../components/detail/AuctionTitle";
import axios from "axios";
import HeartAnimation from "../components/ui/HeartAnimation";

const DetailPage = () => {
  const [bidder, setBidder] = useState(1);
  const [bidPrice, setBidPrice] = useState(0);
  const auctionId = useParams().auctionId;

  const fetchData = async () => {
    const res = await axios.get(`http://20.249.220.42/rt_auction/${auctionId}`);
    return res.data;
  };

  const { data, isFetching, refetch } = useQuery<auctionDetailProps>(
    [auctionId],
    fetchData
  );

  const { artistInfo, auctionInfo, bidderInfos } = data ?? {};

  const client = useRef<StompJs.Client | null>(null);

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: "ws://20.249.220.42/sock",
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

  // 웹소켓 테스트용 bidder 변경 함수
  const tempBidderChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBidder(Number(e.target.value));
  };

  const BidChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBidPrice(Number(e.target.value));
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
          onBidChange={BidChangeHandler}
          auctionInfo={auctionInfo}
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
