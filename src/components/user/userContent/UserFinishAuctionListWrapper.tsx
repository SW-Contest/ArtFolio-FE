import { useState, useRef, useEffect } from "react";
import { AuctionList } from "../../../types/auction.type";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getFinishAuctionList } from "../../../api/auction.api";
import ListBoxSkeletonList from "../../common/ListBoxSkeletonList";
import AuctionListBoxes from "../../auction/auctionContent/auctionListWrapper/AuctionListBoxes";

interface UserFinishAuctionListWrapperProps {
  userId: string | undefined;
}
const UserFinishAuctionListWrapper = (
  props: UserFinishAuctionListWrapperProps
) => {
  const fetchFinishAuctionList = async () => {
    const response = await getFinishAuctionList(props.userId);
    return response.data.userBidAuctionList;
  };

  const {
    isFetching,
    data: auctionListData,
    isError,
  } = useQuery<AuctionList[]>(
    ["finishAuction" + props.userId],
    fetchFinishAuctionList,
    { staleTime: 5000 }
  );

  return (
    <section className="flex flex-col w-full p-3 ">
      <div className="flex gap-4 mb-3">
        <p className="font-semibold">낙찰한 경매</p>
      </div>
      <div className="flex gap-4 overflow-x-auto    ">
        {!isError && isFetching && <ListBoxSkeletonList />}
        {auctionListData && <AuctionListBoxes list={auctionListData} />}
        {isError && <p>데이터 불러오기 오류.</p>}
        {!isError && !isFetching && auctionListData?.length === 0 && (
          <p>데이터가 없습니다.</p>
        )}
      </div>
    </section>
  );
};

export default UserFinishAuctionListWrapper;
