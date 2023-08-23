import {
  ArtPieceDetail,
  ArtPieceLikedList,
} from "../../../types/artPiece.type";

import { useQuery } from "@tanstack/react-query";

import { getLikedArtPieceList } from "../../../api/artPiece.api";

import ListBoxSkeletonList from "../../common/ListBoxSkeletonList";
import UserLikedArtPieceListBoxes from "./UserLikedArtPieceListBoxes";

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
  } = useQuery<ArtPieceLikedList>(
    ["likedArtPiece" + props.userId],
    fetchLikedArtpieceList,
    {
      staleTime: 5000,
    }
  );

  return (
    <section className="flex flex-col w-full p-3  ">
      <div className="flex gap-4 mb-3">
        <p className="font-semibold">좋아요한 작품</p>
      </div>
      <div className="flex gap-4 overflow-x-auto    ">
        {artPieceListData && (
          <UserLikedArtPieceListBoxes
            id="userLikeArtPiece"
            list={artPieceListData.artPieceInfos}
          />
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

export default UserLikedArtPieceListWrapper;
