import Carousel from "./Carousel";
import SearchBar from "./SearchBar";
import AuctionListWrapper from "./auctionListWrapper/AuctionListWrapper";
import SearchResultListWrapper from "./SearchResultListWrapper";
import { useEffect, useState } from "react";
import { AuctionList } from "../../../types/auction.type";
import { getSearchResultList } from "../../../api/auction.api";
import { useQuery } from "@tanstack/react-query";

const AuctionContent = () => {
  const [searchResult, setSearchResult] = useState<AuctionList[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const fetchSearchResultList = async () => {
    const response = await getSearchResultList(searchKeyword);
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
    <section className="flex flex-col mt-10">
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
    </section>
  );
};

export default AuctionContent;
