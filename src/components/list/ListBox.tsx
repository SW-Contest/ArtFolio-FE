import React, { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArtistInfo, AuctionInfo } from "../../types/auction.type";

interface ListBoxProps {
  artistInfo: ArtistInfo;
  auctionInfo: AuctionInfo;
}
const ListBox = (props: ListBoxProps) => {
  const [imgError, setImgError] = useState(
    props.auctionInfo.thumbnailPath === "null"
  );
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/auction/${props.auctionInfo.id}`);
  };

  // 이미지 링크가 잘못되었다면 기본 이미지를 표시합니다.
  const onErrorHandler = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    setImgError(true);
  };

  return (
    <div
      onClick={clickHandler}
      className="relative flex flex-col mb-4 rounded-lg h-60 w-44 list-box font-Pretendard"
    >
      {!imgError ? (
        <img
          onError={onErrorHandler}
          className="flex object-cover w-full h-full rounded-lg "
          src={props.auctionInfo.thumbnailPath}
        />
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p>이미지가 없습니다</p>
        </div>
      )}

      <div className="absolute flex flex-col justify-end w-full h-full p-2 ">
        <p className="text-md font-semibold text-white line-clamp-2  ">
          {props.auctionInfo.title}
        </p>
        <p className="mb-1 text-xs font-semibold text-white truncate">
          {props.artistInfo.name}
        </p>
        <div className="flex gap-1">
          <p className="mb-1 text-xs font-normal text-af-hotPink ">현재가</p>
          <p className="text-xs font-normal text-af-hotPink ">
            {props.auctionInfo.currentPrice}원
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListBox;
