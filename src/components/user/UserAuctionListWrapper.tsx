import ListBox from "../ui/ListBox";
import { useState, useRef, useEffect } from "react";
import { ArtPieceList } from "../../types/auction.type";

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import ListBoxSkeleton from "../ui/ListBoxSkeleton";
import { getArtPieceList } from "../../api/auction.api";
import UserAuctionListBoxes from "./UserAuctionListBoxes";
import { useParams } from "react-router-dom";

const UserAuctionListWrapper = () => {
  const infScroll = useRef(null);
  const [list, setList] = useState<ArtPieceList>();
  const userId = useParams().userId;

  const fetchArtpieceList = async () => {
    const response = await getArtPieceList(userId);
    return response.data;
  };

  const { isFetching, data, isError } = useQuery(
    ["artPiece"],
    fetchArtpieceList
  );

  useEffect(() => {
    if (data) {
      console.log(data);
      setList(data);
    }
  }, [data]);

  return (
    <section className="flex flex-col w-full p-3 font-Pretendard">
      <div className="flex gap-4 mb-3">
        <p className="font-semibold">작품</p>
      </div>
      <div className="flex flex-wrap justify-between w-full">
        {!isError &&
          isFetching &&
          [1, 2, 3, 4, 5, 6].map((_, index) => <ListBoxSkeleton key={index} />)}
        {list && <UserAuctionListBoxes list={list} />}
      </div>
      {isError && <p>데이터가 없습니다.</p>}
      {!isError && !isFetching && <p>데이터가 없습니다.</p>}
      {!isError && (
        <div ref={infScroll} className="flex justify-center w-full h-8"></div>
      )}
    </section>
  );
};

export default UserAuctionListWrapper;
