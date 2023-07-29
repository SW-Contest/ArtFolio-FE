import { useState, useRef, useEffect } from "react";
import { AuctionList } from "../../../types/auction.type";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getFinishAuctionList } from "../../../api/auction.api";
import { useParams } from "react-router-dom";
import ListBoxSkeletonList from "../../ui/ListBoxSkeletonList";
import UserArtPieceListBoxes from "./UserArtPieceListBoxes";
import AuctionListBoxes from "../../auction/auctionContent/auctionListWrapper/AuctionListBoxes";

interface UserAuctionListWrapperProps {
  userId: string | undefined;
}
const UserAuctionListWrapper = (props: UserAuctionListWrapperProps) => {
  const [list, setList] = useState<AuctionList[]>();

  const fetchUserAuctionList = async () => {
    // const response = await getAuctionList(props.userId);
    // return response.data.userBidAuctionList;
  };

  const { isFetching, data, isError } = useQuery(
    ["auction" + props.userId],
    fetchUserAuctionList,
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
        <p className="font-semibold">낙찰한 작품</p>
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

export default UserAuctionListWrapper;
