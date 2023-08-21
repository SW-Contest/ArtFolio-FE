import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArtPieceInfo } from "../../../types/artPiece.type";
import { ArtistInfo } from "../../../types/auction.type";
import TransitionLink from "../../common/TransitionLink";

interface ListBoxProps {
  artistInfo: ArtistInfo;
  artPieceInfo: ArtPieceInfo;
}
const ArtPieceListBox = (props: ListBoxProps) => {
  const [imgError, setImgError] = useState(
    props.artPieceInfo.photoPaths.length === 0
  );

  // 이미지 링크가 잘못되었다면 기본 이미지를 표시합니다.
  const onErrorHandler = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    setImgError(true);
  };

  return (
    <TransitionLink
      to={`/artpiece/${props.artPieceInfo.id}`}
      className=" shrink-0 relative flex flex-col mb-4 rounded-lg h-60 w-[calc(50%-10px)] list-box font-Pretendard"
    >
      {!imgError ? (
        <img
          onError={onErrorHandler}
          className="flex object-cover w-full h-full rounded-lg "
          src={props.artPieceInfo.photoPaths[0]}
        />
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p>이미지가 없습니다</p>
        </div>
      )}

      <div className="absolute flex flex-col justify-end w-full h-full p-2 ">
        <p className="text-md font-semibold text-white line-clamp-2  ">
          {props.artPieceInfo.title}
        </p>
        <p className="mb-1 text-xs font-semibold text-white truncate">
          {/* {props.artistInfo.name} */}
        </p>
      </div>
    </TransitionLink>
  );
};

export default ArtPieceListBox;
