import { useState, useRef, useEffect } from "react";
import { AuctionPage } from "../../../../types/auction.type";

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

import useIntersectionObserver from "../../../../hooks/useIntersectionObserver";
import {
  getAuctionList,
  getMockAuctionList,
} from "../../../../api/auction.api";
import AuctionListBoxes from "./AuctionListBoxes";
import ListBoxSkeletonList from "../../../ui/ListBoxSkeletonList";

const AuctionListWrapper = () => {
  const infScroll = useRef(null);
  const [pages, setPages] = useState<AuctionPage[]>([]);

  const fetchAuctionPage = async ({ pageParam = 0 }) => {
    const response = await getAuctionList(pageParam);
    return response.data;
  };

  const { isFetching, data, fetchNextPage, isError } = useInfiniteQuery(
    ["Page"],
    fetchAuctionPage,
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage.hasNext ? lastPage.pageNumber + 1 : undefined,
    }
  );

  useEffect(() => {
    if (data) {
      setPages(data.pages);
    }
  }, [data]);

  const [observe, unObserve] = useIntersectionObserver(() => {
    fetchNextPage();
  });

  useEffect(() => {
    observe(infScroll.current);
  }, []);

  return (
    <section className="flex flex-col w-full p-3 font-Pretendard">
      <div className="flex gap-4 mb-3">
        <p className="font-semibold">경매 중인 작품</p>
      </div>
      <div className="flex flex-wrap justify-between w-full">
        <AuctionListBoxes pages={pages} />
        {!isError && isFetching && <ListBoxSkeletonList />}
      </div>
      {isError && <p>데이터 불러오기 오류.</p>}
      {!isError && !isFetching && pages.length === 0 && (
        <p>데이터가 없습니다.</p>
      )}
      {!isError && (
        <div ref={infScroll} className="flex justify-center w-full h-8"></div>
      )}
    </section>
  );
};

export default AuctionListWrapper;
