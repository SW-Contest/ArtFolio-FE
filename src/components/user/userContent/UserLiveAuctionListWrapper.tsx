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
    return response.data.userBidAuctionList;
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
      // 참여 중인 경매 데이터에는 같은 경매가 여러 번 포함되어 있을 수 있음
      // 따라서 같은 경매가 여러 번 포함되지 않도록 중복 제거
      select(data) {
        const uniqueData = data.reduce(
          (uniqueArray: AuctionList[], currentItem) => {
            // 이미 같은 id를 갖는 경매 정보가 가 결과 배열에 없다면 추가
            if (
              !uniqueArray.some(
                (item) => item.auctionInfo.id === currentItem.auctionInfo.id
              )
            ) {
              uniqueArray.push(currentItem);
            }
            return uniqueArray;
          },
          []
        );

        return uniqueData;
      },
    }
  );

  return (
    <section className="flex flex-col w-full p-3 ">
      <div className="flex gap-4 mb-3">
        <p className="font-semibold">참여 중 경매</p>
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

export default UserLiveAuctionListWrapper;
