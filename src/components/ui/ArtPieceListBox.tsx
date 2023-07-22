import { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArtistInfo, ArtPieceInfo } from "../../types/auction.type";

interface ListBoxProps {
  artistInfo: ArtistInfo;
  artPieceInfo: ArtPieceInfo;
}
const ArtPieceListBox = (props: ListBoxProps) => {
  const [imgError, setImgError] = useState(
    props.artPieceInfo.photos.length === 0
  );
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/art_piece/${props.artPieceInfo.id}`);
  };

  // 이미지 링크가 잘못되었다면 기본 이미지를 표시합니다.
  const onErrorHandler = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    setImgError(true);
  };

  return (
    <div
      onClick={clickHandler}
      className=" shrink-0 relative flex flex-col mb-4 rounded-lg h-60 w-44 list-box font-Pretendard"
    >
      {!imgError ? (
        <img
          onError={onErrorHandler}
          className="flex object-cover w-full h-full rounded-lg "
          src={props.artPieceInfo.photos[0]}
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
          {props.artistInfo.name}
        </p>
      </div>
    </div>
  );
};

export default ArtPieceListBox;
