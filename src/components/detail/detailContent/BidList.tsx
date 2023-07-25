import React from "react";
import Chart from "./Chart";
import BidListModal from "./BidListModal";
import { useState, useEffect } from "react";
import { BidderInfos, AuctionInfo } from "../../../types/auction.type";

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
  auctionInfo: AuctionInfo;
  bidderInfos: BidderInfos[];
}

const BidList = (props: BidListProps) => {
  const [bidderData, setBidderData] = useState<bidderDataProps[]>([
    { x: null, y: 0, name: "" },
  ]);

  useEffect(() => {
    if (props.bidderInfos && props.auctionInfo) {
      const startPriceData = {
        x: new Date(props.auctionInfo.createdAt),
        y: props.auctionInfo.startPrice,
        name: "",
      };
      const bidInfos = props.bidderInfos.map((bidInfo) => ({
        x: new Date(bidInfo.bidDate),
        y: bidInfo.bidPrice,
        name: bidInfo.name,
      }));
      // 시작 가격의 정보와 bidderInfo의 정보를 합칩니다.
      const newBidInfos = [startPriceData, ...bidInfos];

      setBidderData(newBidInfos);
    }
  }, [props.bidderInfos, props.auctionInfo]);

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

  // 입찰자 미리보기는 뒤에 3개만 표시합니다.
  const lastThree = bidderData.slice(-3).reverse();

  return (
    <article className="mb-4">
      <section className="w-full mb-4">
        <p className="mb-2 text-sm font-semibold">경매 내역</p>
        <Chart
          chartData={chartData}
          startPrice={props.auctionInfo.startPrice}
        />
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

      <BidListModal bidderData={bidderData} />
    </article>
  );
};

export default BidList;
