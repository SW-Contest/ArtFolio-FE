import React from "react";
import AuctionTitle from "./AuctionTitle";
import ArtistInfo from "./ArtistInfo";
import AuctionContent from "./AuctionContent";
import BidList from "./BidList";

interface DetailContentProps {
  auctionInfo: any;
  artistInfo: any;
  bidderInfos: any;
}
const DetailContent = (props: DetailContentProps) => {
  const { auctionInfo, artistInfo, bidderInfos } = props;
  return (
    <section className="flex flex-col p-2 mb-40 font-Pretendard">
      <AuctionTitle auctionInfo={auctionInfo} />
      <ArtistInfo artistInfo={artistInfo} />
      <AuctionContent auctionInfo={auctionInfo} />
      <BidList auctionInfo={auctionInfo} bidderInfos={bidderInfos} />
    </section>
  );
};

export default DetailContent;
