import { useEffect, useRef } from "react";
import { AuctionPage } from "../../../../types/auction.type";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getAuctionList } from "../../../../api/auction.api";
import useIntersectionObserver from "../../../../hooks/useIntersectionObserver";
import ListBoxSkeletonList from "../../../common/ListBoxSkeletonList";
import AuctionListBoxes from "./AuctionListBoxes";

const AuctionListWrapper = () => {
  const infScroll = useRef(null);

  const fetchAuctionPage = async ({ pageParam = 0 }) => {
    const response = await getAuctionList(pageParam);
    return response.data;
  };

  const {
    isFetching,
    data: pageData,
    fetchNextPage,
    isError,
  } = useInfiniteQuery<AuctionPage>(["Page"], fetchAuctionPage, {
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasNext ? lastPage.pageNumber + 1 : undefined,
  });

  const [observe, unObserve] = useIntersectionObserver(() => {
    fetchNextPage();
  });

  useEffect(() => {
    observe(infScroll.current);
  }, []);

  return (
    <section className="flex flex-col w-full p-3">
      <div className="flex gap-4 mb-3">
        <p className="font-semibold">경매중인 작품</p>
      </div>
      <div className="flex flex-wrap justify-between w-full">
        <AuctionListBoxes id="auctionLive" pages={pageData?.pages} />
        {!isError && isFetching && <ListBoxSkeletonList />}
      </div>
      {isError && <p>데이터 불러오기 오류.</p>}
      {!isError && !isFetching && !pageData?.pages[0].dataSize && (
        <p>데이터가 없습니다.</p>
      )}
      {!isError && (
        <div ref={infScroll} className="flex justify-center w-full h-8"></div>
      )}
    </section>
  );
};

export default AuctionListWrapper;
