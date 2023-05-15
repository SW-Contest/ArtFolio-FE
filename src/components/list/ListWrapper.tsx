import ListButton from "./ListButton";
import ListBox from "./ListBox";
import { useState, useRef, useEffect } from "react";
import { auctionListProps } from "../../mocks/dummyList";
import axios from "Axios";
import useListState from "../../store/store";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

import useIntersectionObserver from "../../hooks/useIntersectionObserver";

const ListWrapper = () => {
  const infScroll = useRef(null);
  const [pages, setPages] = useState<auctionListProps[]>([]);
  const [sort, setSort] = useState("전체"); // 전체,인기

  const fetchData = async ({ pageParam = 0 }) => {
    const res = await axios.get(
      `http://20.249.220.42:8080/rt_auction/list?page=${pageParam}&size=10&sort=auctionLike,DESC`
    );
    return res.data;
  };

  const {
    isFetching,
    status,
    isLoading,
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useInfiniteQuery(["Page"], fetchData, {
    getNextPageParam: (lastPage, allPages) =>
      lastPage.dataSize == 10 ? lastPage.pageNumber + 1 : undefined,
  });

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
        {/* <ListButton sort={sort} name="전체" onClick={changeSortHandler}>
          전체
        </ListButton>
        <ListButton sort={sort} name="인기" onClick={changeSortHandler}>
          인기
        </ListButton> */}
      </div>
      <div className="flex w-full min-h-screen flex-wrap justify-between">
        {pages?.map((list) =>
          list?.data?.map((item, index) => <ListBox key={index} {...item} />)
        )}
      </div>
      <div ref={infScroll} className="flex justify-center w-full h-8">
        {isFetching && (
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        )}
      </div>
    </section>
  );
};

export default ListWrapper;
