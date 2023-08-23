import { useState, useRef, useEffect } from "react";
import { AuctionList } from "../../../types/auction.type";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getUserAuctionList } from "../../../api/auction.api";

import ListBoxSkeletonList from "../../common/ListBoxSkeletonList";

import AuctionListBoxes from "../../auction/auctionContent/auctionListWrapper/AuctionListBoxes";

interface UserAuctionListWrapperProps {
  userId: string | undefined;
}
const UserAuctionListWrapper = (props: UserAuctionListWrapperProps) => {
  const fetchUserAuctionList = async () => {
    const response = await getUserAuctionList(props.userId);
    return response.data.myAuctions;
  };

  const {
    isFetching,
    data: auctionListData,
    isError,
  } = useQuery<AuctionList[]>(
    ["auction" + props.userId],
    fetchUserAuctionList,
    { staleTime: 5000 }
  );

  return (
    <section className="flex flex-col w-full p-3 ">
      <div className="flex gap-4 mb-3">
        <p className="font-semibold">등록한 경매</p>
      </div>
      <div className="flex gap-4 overflow-x-auto    ">
        {auctionListData && (
          <AuctionListBoxes id="userAuction" list={auctionListData} />
        )}
        {!isError && isFetching && <ListBoxSkeletonList />}
        {isError && <p>데이터 불러오기 오류.</p>}
        {!isError && !isFetching && auctionListData?.length === 0 && (
          <p>데이터가 없습니다.</p>
        )}
      </div>
    </section>
  );
};

export default UserAuctionListWrapper;
