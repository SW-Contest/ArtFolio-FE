import Layout from "../components/ui/Layout";
import { useParams } from "react-router-dom";
import Header from "../components/ui/Header";
import { dummyDetail } from "../mocks/dummyList";
import DetailCarousel from "../components/detail/DetailCarousel";

import { useEffect, useState, useRef, MutableRefObject } from "react";
import * as StompJs from "@stomp/stompjs";
import UserIcon from "../components/ui/UserIcon";

import DetailFooter from "../components/detail/DetailFooter";
import Chart from "../components/detail/Chart";

interface AuctionProps {
  x: Date;
  y: number;
}

interface ChartDataProps {
  id: string;
  color: string;
  data: AuctionProps[];
}

const DetailPage = () => {
  const [bidder, setBidder] = useState(1);
  const auctionId = Number(useParams().auctionId);
  const [dummyAuction, setDummyAuction] = useState<AuctionProps[]>([
    { x: new Date(), y: 0 },
  ]);

  const [chartData, setChartData] = useState<ChartDataProps[]>([
    {
      id: "charts",
      color: "",
      data: [],
    },
  ]);

  const item = dummyDetail;

  const client = useRef<StompJs.Client | null>(null);

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: "ws://20.249.220.42:8080/sock",
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
      destination: "/pub/price",
      body: JSON.stringify({
        auctionId: "1e47fdfc-4d18-4b9a-955e-e2e3396ea540",
        bidderId: bidder,
        price: 10000 + bidder,
      }),
    });
  };

  const subscribe = () => {
    client.current?.subscribe(
      "/sub/channel/" + "1e47fdfc-4d18-4b9a-955e-e2e3396ea540",
      (body: any) => {
        const json_body = JSON.parse(body.body);
        console.log(json_body);
      }
    );
  };

  const disconnect = () => {
    client.current?.deactivate();
  };

  // useEffect(() => {
  //   connect();

  //   return () => disconnect();
  // }, []);

  const dummyButtonHandler = () => {
    const new_auction = {
      x: new Date(),
      y: dummyAuction.length,
    };
    setDummyAuction((prev) => [...prev, new_auction]);
  };

  useEffect(() => {
    if (dummyAuction.length < 7) {
      setChartData((prev) => [{ ...prev[0], data: [...dummyAuction] }]);
    } else {
      const lastSix = dummyAuction.slice(-6);
      const newData = dummyAuction.slice(0, 1);
      setChartData((prev) => [
        { ...prev[0], data: [...newData.concat(lastSix)] },
      ]);
    }
  }, [dummyAuction]);

  // 웹소켓 테스트용 bidder 변경 함수
  const tempBidderChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBidder(Number(e.target.value));
  };

  return (
    <Layout>
      <Header />
      <DetailCarousel photoPaths={item.photoPaths} />
      {/* <input onChange={tempBidderChangeHandler} />
      <button onClick={() => console.log(bidder)}>확인</button> */}
      <section className="flex flex-col p-2 mb-40 font-Pretendard">
        <article className="flex justify-between w-full py-2">
          <p className="text-xl font-bold ">{item.artPieceTitle}</p>
          <p className="text-xl font-bold text-af-hotPink ">
            {item.auctionStartPrice}원
          </p>
        </article>
        <article className="flex items-center w-full gap-4 p-4 mb-4 rounded-md bg-af-lightGray">
          <UserIcon url="/src/assets/img/cat.jpeg" />
          <div className="flex flex-col justify-between grow">
            <p className="text-sm font-bold truncate ">{item.artPieceId}</p>

            <p className="text-xs font-light">최근 거래 작품 n</p>
          </div>
          <button className="border-0 rounded-full btn btn-sm bg-af-hotPink hover:bg-af-hotPink">
            작가 Home
          </button>
        </article>
        <article className="mb-4">
          <p className="mb-2 text-sm font-semibold">작품 설명</p>
          <p className="w-full mb-1 text-sm font-normal ">
            {item.auctionContent}
          </p>
        </article>
        <article className="mb-4">
          <section className="w-full mb-4">
            <p className="mb-2 text-sm font-semibold">경매 내역</p>
            <Chart chartData={chartData} />
            <div className="flex justify-between py-1 border-b">
              <p className="w-1/2 text-xs font-light text-left">입찰자</p>
              <p className="w-1/2 text-xs font-light text-right">입찰가</p>
            </div>
            <div className="flex justify-between py-1">
              <p className="w-1/2 text-xs font-light text-left">김김김</p>
              <p className="w-1/2 text-xs font-light text-right">100,000</p>
            </div>
            <div className="flex justify-between py-1">
              <p className="w-1/2 text-xs font-light text-left">김김김</p>
              <p className="w-1/2 text-xs font-light text-right">100,000</p>
            </div>
            <div className="flex justify-between py-1">
              <p className="w-1/2 text-xs font-light text-left">김김김</p>
              <p className="w-1/2 text-xs font-light text-right">100,000</p>
            </div>
          </section>

          <div className="flex justify-center w-full">
            <label htmlFor="my-modal-4" className="btn btn-ghost">
              전체보기 {">"}
            </label>
          </div>

          {/* 모달 내용 */}
          <input type="checkbox" id="my-modal-4" className="modal-toggle" />
          <label htmlFor="my-modal-4" className="cursor-pointer modal">
            <label className="modal-box relative w-[350px]" htmlFor="">
              <p className="mb-2 text-sm font-semibold">경매 내역</p>
              <div className="flex justify-between py-1 border-b">
                <p className="w-1/2 text-xs font-light text-left">입찰자</p>
                <p className="w-1/2 text-xs font-light text-right">입찰가</p>
              </div>
              <div className="flex justify-between py-1">
                <p className="w-1/2 text-xs font-light text-left">김김김</p>
                <p className="w-1/2 text-xs font-light text-right">100,000</p>
              </div>
              <div className="flex justify-between py-1">
                <p className="w-1/2 text-xs font-light text-left">김김김</p>
                <p className="w-1/2 text-xs font-light text-right">100,000</p>
              </div>
              <div className="flex justify-between py-1">
                <p className="w-1/2 text-xs font-light text-left">김김김</p>
                <p className="w-1/2 text-xs font-light text-right">100,000</p>
              </div>
            </label>
          </label>
        </article>
      </section>
      <DetailFooter onClick={dummyButtonHandler} />
    </Layout>
  );
};

export default DetailPage;
