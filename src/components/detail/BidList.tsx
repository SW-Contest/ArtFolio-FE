import React from "react";
import Chart from "./Chart";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import { auctionDetailProps } from "../../mocks/dummyList";

interface bidderDataProps {
  x: Date | null;
  y: number;
}

interface chartDataProps {
  id: string;
  data: bidderDataProps[];
}

interface BidListProps {
  data: auctionDetailProps;
}

const BidList = (props: BidListProps) => {
  const [bidderData, setBidderData] = useState<bidderDataProps[]>([
    { x: null, y: 0 },
  ]);

  const [chartData, setChartData] = useState<chartDataProps[]>([
    {
      id: "charts",
      data: [],
    },
  ]);

  const { auctionInfo, bidderInfos } = props.data;

  useEffect(() => {
    if (props.data && auctionInfo) {
      const startPriceData = {
        x: new Date(auctionInfo.createdAt),
        y: auctionInfo.startPrice,
      };
      const bidInfos = bidderInfos.map((bidInfo) => ({
        x: new Date(bidInfo.bidDate),
        y: bidInfo.bidPrice,
      }));
      const newBidInfos = [startPriceData, ...bidInfos];

      setBidderData(newBidInfos);
    }
  }, [props.data]);

  useEffect(() => {
    if (bidderData.length < 7) {
      setChartData((prev) => [{ ...prev[0], data: [...bidderData] }]);
    } else {
      const lastSix = bidderData.slice(-6);
      const newData = bidderData.slice(0, 1);

      // setChartData((prev) => [{ ...prev[0], data: [...lastSix] }]);
      setChartData((prev) => [
        { ...prev[0], data: [...newData.concat(lastSix)] },
      ]);
    }
  }, [bidderData]);

  return (
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
  );
};

export default BidList;
