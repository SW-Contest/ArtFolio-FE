import { useState, useRef, useEffect } from "react";
import { ArtPieceList } from "../../../types/auction.type";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getArtPieceList } from "../../../api/artPiece.api";
import { useParams } from "react-router-dom";
import ListBoxSkeletonList from "../../ui/ListBoxSkeletonList";
import UserArtPieceListBoxes from "./UserArtPieceListBoxes";

interface UserArtPieceListWrapperProps {
  userId: string | undefined;
}
const UserArtPieceListWrapper = (props: UserArtPieceListWrapperProps) => {
  const infScroll = useRef(null);
  const [list, setList] = useState<ArtPieceList>();

  const fetchArtpieceList = async () => {
    const response = await getArtPieceList(props.userId);
    return response.data;
  };

  const { isFetching, data, isError } = useQuery(
    ["artPiece" + props.userId],
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
        <p className="font-semibold">등록한 작품</p>
      </div>
      <div className="flex gap-4 overflow-x-auto    ">
        {!isError && isFetching && <ListBoxSkeletonList />}
        {list && <UserArtPieceListBoxes list={list} />}
        {isError && <p>데이터 불러오기 오류.</p>}
        {!isError && !isFetching && list?.artPieceInfos.length === 0 && (
          <p>데이터가 없습니다.</p>
        )}
        {!isError && (
          <div ref={infScroll} className="flex justify-center w-8 h-full"></div>
        )}
      </div>
    </section>
  );
};

export default UserArtPieceListWrapper;
