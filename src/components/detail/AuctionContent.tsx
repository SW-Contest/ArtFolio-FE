import React from "react";
import { auctionInfoProps } from "../../mocks/dummyList";

interface AuctionContentProps {
  auctionInfo: auctionInfoProps;
}
const AuctionContent = (props: AuctionContentProps) => {
  return (
    <article className="mb-4">
      <p className="mb-2 text-sm font-semibold">작품 설명</p>
      <p className="w-full mb-1 text-sm font-normal ">
        {props.auctionInfo.content}
      </p>
    </article>
  );
};

export default AuctionContent;
