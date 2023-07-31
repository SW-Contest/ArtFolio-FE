import { useState, useRef, useEffect } from "react";
import { ArtPieceList } from "../../../types/artPiece.type";

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

import { getLikedArtPieceList } from "../../../api/artPiece.api";
import UserAuctionListBoxes from "./UserArtPieceListBoxes";

import ListBoxSkeletonList from "../../common/ListBoxSkeletonList";

interface UserLikedArtPieceListWrapperProps {
  userId: string | undefined;
}

const UserLikedArtPieceListWrapper = (
  props: UserLikedArtPieceListWrapperProps
) => {
  const fetchLikedArtpieceList = async () => {
    const response = await getLikedArtPieceList(props.userId);
    return response.data;
  };

  const {
    isFetching,
    data: artPieceListData,
    isError,
  } = useQuery<ArtPieceList>(
    ["likedArtPiece" + props.userId],
    fetchLikedArtpieceList,
    { staleTime: 5000 }
  );

  return (
    <section className="flex flex-col w-full p-3  ">
      <div className="flex gap-4 mb-3">
        <p className="font-semibold">좋아요 한 작품</p>
      </div>
      <div className="flex gap-4 overflow-x-auto    ">
        {artPieceListData && <UserAuctionListBoxes list={artPieceListData} />}
        {!isError && isFetching && <ListBoxSkeletonList />}
        {isError && <p>데이터 불러오기 오류.</p>}
        {!isError &&
          !isFetching &&
          artPieceListData?.artPieceInfos.length === 0 && (
            <p>데이터가 없습니다.</p>
          )}
      </div>
    </section>
  );
};

export default UserLikedArtPieceListWrapper;
