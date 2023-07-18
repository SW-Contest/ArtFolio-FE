import React from "react";
import { AuctionInfo } from "../../../../types/auction.type";

interface AuctionTitleProps {
  auctionInfo: AuctionInfo;
}
const AuctionTitle = (props: AuctionTitleProps) => {
  return (
    <article className="flex justify-between w-full py-2">
      <p className="text-xl font-bold ">{props.auctionInfo.title}</p>
      <p className="text-xl font-bold text-af-hotPink ">
        {props.auctionInfo.currentPrice}원
      </p>
    </article>
  );
};

export default AuctionTitle;
