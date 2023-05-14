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
import { motion } from "framer-motion";
import Modal from "../components/detail/Modal";
import axios from "Axios";
import { useQuery } from "@tanstack/react-query";

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
  const auctionId = useParams().auctionId;
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

  const fetchData = async () => {
    const res = await axios.get(
      `http://20.249.220.42:8080/rt_auction/${auctionId}`
    );
    return res.data;
  };

  const { data, isFetching } = useQuery([auctionId], fetchData);

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

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
        auctionId: auctionId,
        bidderId: bidder,
        price: 10000 + bidder,
      }),
    });
  };

  const subscribe = () => {
    client.current?.subscribe("/sub/channel/" + auctionId, (body: any) => {
      const json_body = JSON.parse(body.body);
      console.log(json_body);
    });
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

  if (!data)
    return (
      <Layout>
        <div className="flex w-full">
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <Header />

      <DetailCarousel photoPaths={data.photoPaths} />
      {/* <input onChange={tempBidderChangeHandler} />
      <button onClick={() => console.log(bidder)}>확인</button> */}
      <section className="flex flex-col p-2 mb-40 font-Pretendard">
        <article className="flex justify-between w-full py-2">
          <p className="text-xl font-bold ">{data.artPieceTitle}</p>
          <p className="text-xl font-bold text-af-hotPink ">
            {data.auctionStartPrice}원
          </p>
        </article>
        <article className="flex items-center w-full gap-4 p-4 mb-4 rounded-md bg-af-lightGray">
          <UserIcon url="/src/assets/img/cat.jpeg" />
          <div className="flex flex-col justify-between grow">
            <p className="text-sm font-bold truncate ">{data.artPieceId}</p>

            <p className="text-xs font-light">최근 거래 작품 n</p>
          </div>
          <motion.button
            initial={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="border-0 rounded-full px-2 py-1 text-white bg-af-hotPink "
          >
            작가 Home
          </motion.button>
        </article>
        <article className="mb-4">
          <p className="mb-2 text-sm font-semibold">작품 설명</p>
          <p className="w-full mb-1 text-sm font-normal ">
            {data.auctionContent}
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

          <Modal />
        </article>
      </section>
      <DetailFooter onClick={dummyButtonHandler} />
    </Layout>
  );
};

export default DetailPage;
