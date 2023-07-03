import ListBox from "./ListBox";
import { useState, useRef, useEffect } from "react";
import { AuctionList } from "../../types/auction.type";

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import ListBoxSkeleton from "./ListBoxSkeleton";
import { getAuctionPage } from "../../api/auction.api";

const ListWrapper = () => {
  const infScroll = useRef(null);
  const [pages, setPages] = useState<AuctionList[]>([]);
  const [sort, setSort] = useState("전체"); // 전체,인기

  const fetchAuctionPage = async ({ pageParam = 0 }) => {
    const response = await getAuctionPage(pageParam);
    return response.data;
  };

  const { isFetching, data, fetchNextPage } = useInfiniteQuery(
    ["Page"],
    fetchAuctionPage,
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage.hasNext ? lastPage.pageNumber + 1 : undefined,
    }
  );

  useEffect(() => {
    if (data) {
      console.log(data.pages);
      setPages(data.pages);
    }
  }, [data]);

  const [observe, unObserve] = useIntersectionObserver(() => {
    fetchNextPage();
  });

  const changeSortHandler = (changeSort: string) => {
    setSort(changeSort);
  };

  useEffect(() => {
    observe(infScroll.current);
  }, []);

  return (
    <section className="flex flex-col w-full p-3 font-Pretendard">
      <div className="flex gap-4 mb-3">
        <p className="font-semibold">아트폴리오에서 경매 중인 작품</p>
      </div>
      <div className="flex flex-wrap justify-between w-full">
        {pages.map((list) =>
          list.data.map((item) => (
            <ListBox
              key={item.auctionInfo.id}
              artistInfo={item.artistInfo}
              auctionInfo={item.auctionInfo}
            />
          ))
        )}
        {isFetching &&
          [1, 2, 3, 4, 5, 6].map((_, index) => <ListBoxSkeleton key={index} />)}
      </div>
      <div ref={infScroll} className="flex justify-center w-full h-8">
        {!isFetching && !data && <p>데이터가 없습니다.</p>}
      </div>
    </section>
  );
};

export default ListWrapper;
