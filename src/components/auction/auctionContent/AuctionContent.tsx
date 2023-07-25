import Carousel from "./Carousel";
import SearchBar from "./SearchBar";
import AuctionListWrapper from "./auctionListWrapper/AuctionListWrapper";
import SearchResultListWrapper from "./SearchResultListWrapper";
import { useState } from "react";
import { AuctionList } from "../../../types/auction.type";
import { getSearchResultList } from "../../../api/auction.api";
import { useQuery } from "@tanstack/react-query";

const AuctionContent = () => {
  const [searchResult, setSearchResult] = useState<AuctionList[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchSearchResultList = async () => {
    const response = await getSearchResultList();
    // return response.data;
  };

  const { isFetching, data, isError } = useQuery(
    ["SearchResultList"],
    fetchSearchResultList,
    {
      enabled: !!searchQuery,
    }
  );

  const changeSearchQueryHandler = (searchText: string) => {
    setSearchQuery(searchText);
  };
  return (
    <>
      <Carousel />
      <SearchBar changeSearchQuery={changeSearchQueryHandler} />
      {searchQuery && (
        <SearchResultListWrapper
          isFetching={isFetching}
          data={data}
          isError={isError}
          searchResult={searchResult}
        />
      )}
      {!searchQuery && <AuctionListWrapper />}
    </>
  );
};

export default AuctionContent;
