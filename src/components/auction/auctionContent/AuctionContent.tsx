import Carousel from "./Carousel";
import SearchBar from "./SearchBar";
import AuctionListWrapper from "./auctionListWrapper/AuctionListWrapper";
import SearchResultListWrapper from "./SearchResultListWrapper";
import { useEffect, useState } from "react";
import { AuctionData } from "../../../types/auction.type";
import { getSearchResultList } from "../../../api/auction.api";
import { useQuery } from "@tanstack/react-query";

const AuctionContent = () => {
  const [searchResult, setSearchResult] = useState<AuctionData[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const fetchSearchResultList = async () => {
    const response = await getSearchResultList(searchKeyword);
    console.log(response);
    return response.data.searchResult;
  };

  const { isFetching, data, isError } = useQuery(
    ["SearchResult" + searchKeyword],
    fetchSearchResultList,
    {
      enabled: !!searchKeyword,
    }
  );

  useEffect(() => {
    if (data) {
      setSearchResult(data);
    }
  }, [data]);

  const changeSearchKeywordHandler = (searchText: string) => {
    setSearchKeyword(searchText);
  };
  return (
    <>
      <Carousel />
      <SearchBar changeSearchQuery={changeSearchKeywordHandler} />
      {searchKeyword && (
        <SearchResultListWrapper
          isFetching={isFetching}
          isError={isError}
          searchResult={searchResult}
        />
      )}
      {!searchKeyword && <AuctionListWrapper />}
    </>
  );
};

export default AuctionContent;
