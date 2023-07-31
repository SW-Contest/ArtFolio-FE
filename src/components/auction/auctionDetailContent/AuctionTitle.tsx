import { AuctionInfo } from "../../../types/auction.type";

interface AuctionTitleProps {
  auctionInfo: AuctionInfo;
}
const AuctionTitle = (props: AuctionTitleProps) => {
  return (
    <article className="flex justify-between w-full py-2">
      <h2 className="text-xl font-bold ">{props.auctionInfo.title}</h2>
      <h2 className="text-xl font-bold text-af-hotPink ">
        {props.auctionInfo.currentPrice}원
      </h2>
    </article>
  );
};

export default AuctionTitle;
