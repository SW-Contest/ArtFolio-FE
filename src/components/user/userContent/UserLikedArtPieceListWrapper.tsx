import { useState, useRef, useEffect } from "react";
import { ArtPieceList } from "../../../types/auction.type";

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

import { getLikedArtPieceList } from "../../../api/artPiece.api";
import UserAuctionListBoxes from "./UserAuctionListBoxes";

import ListBoxSkeletonList from "../../ui/ListBoxSkeletonList";

interface UserLikedArtPieceListWrapperProps {
  userId: string | undefined;
}

const UserLikedArtPieceListWrapper = (
  props: UserLikedArtPieceListWrapperProps
) => {
  const infScroll = useRef(null);
  const [list, setList] = useState<ArtPieceList>();

  const fetchLikedArtpieceList = async () => {
    const response = await getLikedArtPieceList(props.userId);
    return response.data;
  };

  const { isFetching, data, isError } = useQuery(
    ["likedArtPiece"],
    fetchLikedArtpieceList
  );

  useEffect(() => {
    if (data) {
      console.log(data);
      setList(data);
    }
  }, [data]);

  return (
    <section className="flex flex-col w-full p-3 font-Pretendard ">
      <div className="flex gap-4 mb-3">
        <p className="font-semibold">좋아요 한 작품</p>
      </div>
      <div className="flex gap-4 overflow-x-auto    ">
        {!isError && isFetching && <ListBoxSkeletonList />}
        {list && <UserAuctionListBoxes list={list} />}
        {isError && <p>데이터 불러오기 오류.</p>}
        {!isError && !isFetching && !list && <p>데이터가 없습니다.</p>}
        {!isError && (
          <div ref={infScroll} className="flex justify-center w-8 h-full"></div>
        )}
      </div>
    </section>
  );
};

export default UserLikedArtPieceListWrapper;
