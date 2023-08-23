import { useState, useRef, useEffect } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getArtPieceList } from "../../../api/artPiece.api";
import { useParams } from "react-router-dom";
import ListBoxSkeletonList from "../../common/ListBoxSkeletonList";
import UserArtPieceListBoxes from "./UserArtPieceListBoxes";
import { ArtPieceList } from "../../../types/artPiece.type";

interface UserArtPieceListWrapperProps {
  userId: string | undefined;
}
const UserArtPieceListWrapper = (props: UserArtPieceListWrapperProps) => {
  const fetchArtpieceList = async () => {
    const response = await getArtPieceList(props.userId);
    return response.data;
  };

  const {
    isFetching,
    data: artPieceListData,
    isError,
  } = useQuery<ArtPieceList>(["artPiece" + props.userId], fetchArtpieceList, {
    staleTime: 5000,
  });

  return (
    <section className="flex flex-col w-full p-3 ">
      <div className="flex gap-4 mb-3">
        <p className="font-semibold">등록한 작품</p>
      </div>
      <div className="flex gap-4 overflow-x-auto    ">
        {artPieceListData && (
          <UserArtPieceListBoxes id="userArtPiece" list={artPieceListData} />
        )}
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

export default UserArtPieceListWrapper;
