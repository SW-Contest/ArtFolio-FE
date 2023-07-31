import { useState, useRef, useEffect } from "react";
import { AuctionInfo, AuctionList } from "../../../types/auction.type";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getLikedAuctionList } from "../../../api/auction.api";
import ListBoxSkeletonList from "../../common/ListBoxSkeletonList";
import AuctionListBoxes from "../../auction/auctionContent/auctionListWrapper/AuctionListBoxes";

interface UserLikedAuctionListWrapperProps {
  userId: string | undefined;
}
const UserLikedAuctionListWrapper = (
  props: UserLikedAuctionListWrapperProps
) => {
  const [list, setList] = useState<AuctionList[]>();

  const fetchLikedAuctionList = async () => {
    const response = await getLikedAuctionList(props.userId);
    return response.data.auctionInfos;
  };

  const { isFetching, data, isError } = useQuery<AuctionList[]>(
    ["likedAuction" + props.userId],
    fetchLikedAuctionList,
    { staleTime: 5000 }
  );

  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);

  return (
    <section className="flex flex-col w-full p-3 ">
      <div className="flex gap-4 mb-3">
        <p className="font-semibold">좋아요 한 경매</p>
      </div>
      <div className="flex gap-4 overflow-x-auto    ">
        {!isError && isFetching && <ListBoxSkeletonList />}
        {list && <AuctionListBoxes list={list} />}
        {isError && <p>데이터 불러오기 오류.</p>}
        {!isError && !isFetching && list?.length === 0 && (
          <p>데이터가 없습니다.</p>
        )}
      </div>
    </section>
  );
};

export default UserLikedAuctionListWrapper;
