import React from "react";
import Chart from "./Chart";
import DetailModal from "./DetailModal";
import { useState, useEffect } from "react";
import { auctionDetailProps } from "../../mocks/dummyList";

export interface bidderDataProps {
  x: Date | null;
  y: number;
  name: string;
}

export interface chartDataProps {
  id: string;
  data: bidderDataProps[];
}

interface BidListProps {
  data: auctionDetailProps;
}

const BidList = (props: BidListProps) => {
  const [bidderData, setBidderData] = useState<bidderDataProps[]>([
    { x: null, y: 0, name: "" },
  ]);

  const { auctionInfo, bidderInfos } = props.data;

  useEffect(() => {
    if (props.data && auctionInfo) {
      const startPriceData = {
        x: new Date(auctionInfo.createdAt),
        y: auctionInfo.startPrice,
        name: "",
      };
      const bidInfos = bidderInfos.map((bidInfo) => ({
        x: new Date(bidInfo.bidDate),
        y: bidInfo.bidPrice,
        name: bidInfo.name,
      }));
      // 시작 가격의 정보와 bidderInfo의 정보를 합칩니다.
      const newBidInfos = [startPriceData, ...bidInfos];

      setBidderData(newBidInfos);
    }
  }, [props.data]);

  // useEffect(() => {

  //   if (bidderData.length < 7) {
  //     setChartData((prev) => [{ ...prev[0], data: [...bidderData] }]);
  //   } else {
  //     const lastFive = bidderData.slice(-5);
  //     const newData = bidderData.slice(0, 1);

  //     setChartData((prev) => [
  //       { ...prev[0], data: [...newData.concat(lastFive)] },
  //     ]);
  //   }
  // }, [bidderData]);

  let chartData: chartDataProps[] = [
    {
      id: "charts",
      data: [],
    },
  ];

  // chart에는 6개의 포인트만 보여줄 것이므로 6개 이하라면 그대로 보여주고 ,
  // 아니라면 첫 번째 데이터와 뒤에서부터 5개의 데이터를 합쳐서 보여줍니다.
  if (bidderData.length < 7) {
    chartData = [{ ...chartData[0], data: [...bidderData] }];
  } else {
    const lastFive = bidderData.slice(-5);
    const newData = bidderData.slice(0, 1);

    chartData = [{ ...chartData[0], data: [...newData.concat(lastFive)] }];
  }

  const lastThree = bidderData.slice(-3);

  return (
    <article className="mb-4">
      <section className="w-full mb-4">
        <p className="mb-2 text-sm font-semibold">경매 내역</p>
        <Chart chartData={chartData} startPrice={auctionInfo.startPrice} />
        <div className="flex justify-between py-1 border-b">
          <p className="w-1/2 text-xs font-light text-left">입찰자</p>
          <p className="w-1/2 text-xs font-light text-right">입찰가</p>
        </div>
        {lastThree.map((bidInfo, index) => (
          <div key={index} className="flex justify-between py-1">
            <p className="w-1/2 text-xs font-light text-left">{bidInfo.name}</p>
            <p className="w-1/2 text-xs font-light text-right">{bidInfo.y}원</p>
          </div>
        ))}
      </section>

      <DetailModal bidderData={bidderData} />
    </article>
  );
};

export default BidList;
