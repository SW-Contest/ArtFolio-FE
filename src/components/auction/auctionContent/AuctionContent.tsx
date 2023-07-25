import Carousel from "./Carousel";
import SearchBar from "./SearchBar";
import AuctionListWrapper from "./auctionListWrapper/AuctionListWrapper";
import { useState } from "react";

const AuctionContent = () => {
  const [searchResult, setSearchResult] = useState<string[] | null>(null);
  return (
    <>
      <Carousel />
      <SearchBar searchResult={searchResult} />
      <AuctionListWrapper searchResult={searchResult} />
    </>
  );
};

export default AuctionContent;
