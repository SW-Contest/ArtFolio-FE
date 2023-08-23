import { useState, useRef, useEffect } from "react";
import { AuctionList } from "../../../types/auction.type";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getLiveAuctionList } from "../../../api/auction.api";
import { useParams } from "react-router-dom";
import ListBoxSkeletonList from "../../common/ListBoxSkeletonList";
import UserArtPieceListBoxes from "./UserArtPieceListBoxes";
import AuctionListBoxes from "../../auction/auctionContent/auctionListWrapper/AuctionListBoxes";

interface UserLiveAuctionListWrapperProps {
  userId: string | undefined;
}
const UserLiveAuctionListWrapper = (props: UserLiveAuctionListWrapperProps) => {
  const fetchLiveAuctionList = async () => {
    const response = await getLiveAuctionList(props.userId);
    return response.data.userAttendingAuctionList;
  };

  const {
    isFetching,
    data: auctionListData,
    isError,
  } = useQuery<AuctionList[]>(
    ["liveAuction" + props.userId],
    fetchLiveAuctionList,
    {
      staleTime: 5000,
    }
  );

  return (
    <section className="flex flex-col w-full p-3 ">
      <div className="flex gap-4 mb-3">
        <p className="font-semibold">참여중 경매</p>
      </div>
      <div className="flex gap-4 overflow-x-auto    ">
        {!isError && isFetching && <ListBoxSkeletonList />}
        {auctionListData && (
          <AuctionListBoxes id="userLiveAuction" list={auctionListData} />
        )}
        {isError && <p>데이터 불러오기 오류.</p>}
        {!isError && !isFetching && auctionListData?.length === 0 && (
          <p>데이터가 없습니다.</p>
        )}
      </div>
    </section>
  );
};

export default UserLiveAuctionListWrapper;
