import React from "react";
import { AuctionInfo } from "../../../types/auction.type";

interface AuctionDescriptionProps {
  auctionInfo: AuctionInfo;
}
const AuctionDescription = (props: AuctionDescriptionProps) => {
  return (
    <article>
      <h3 className="mb-2 text-sm font-semibold">경매 설명</h3>
      <p className="w-full mb-1 text-sm font-normal ">
        {props.auctionInfo.content}
      </p>
    </article>
  );
};

export default AuctionDescription;
