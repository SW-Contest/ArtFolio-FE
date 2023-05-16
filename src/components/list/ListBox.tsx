import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auctionProps } from "../../mocks/dummyList";

interface ListBoxProps {
  data: auctionProps;
}
const ListBox = (props: auctionProps) => {
  const navigate = useNavigate();
  const [time, setTime] = useState("");

  // useEffect(() => {
  //   tick();
  //   const timeId = setInterval(() => tick(), 1000);

  //   return () => {
  //     clearInterval(timeId);
  //   };
  // }, []);

  // const getTimeLeft = () => {
  //   const curTime = new Date();
  //   const timeDiff = Math.abs(curTime.getTime() - props.timeLeft.getTime());
  //   let hours: string | number = Math.floor(timeDiff / 3600000);
  //   let minutes: string | number = Math.floor((timeDiff % 3600000) / 60000);
  //   let seconds: string | number = Math.floor((timeDiff % 60000) / 1000);

  //   if (minutes < 10) minutes = `0${minutes}`;
  //   if (seconds < 10) seconds = `0${seconds}`;
  //   if (hours < 10) hours = `0${hours}`;

  //   const timeLeft = hours + ":" + minutes + ":" + seconds;

  //   return timeLeft;
  // };

  // const tick = () => {
  //   setTime(() => getTimeLeft());
  // };

  const clickHandler = () => {
    navigate(`/auction/${props.auctionId}`);
  };

  return (
    <div
      onClick={clickHandler}
      className="relative flex flex-col mb-4 rounded-lg h-60 w-44 list-box font-Pretendard"
    >
      {props.thumbnailPath !== "null" ? (
        <img
          className="flex object-cover w-full h-full rounded-lg "
          src={props.thumbnailPath}
        />
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p>이미지가 없습니다</p>
        </div>
      )}

      <div className="absolute flex flex-col justify-end w-full h-full p-2 ">
        <p className="text-md font-semibold text-white line-clamp-2  ">
          {props.auctionTitle}
        </p>
        <p className="mb-1 text-xs font-semibold text-white truncate">
          {props.artist}
        </p>
        <div className="flex gap-1">
          <p className="mb-1 text-xs font-normal text-af-hotPink ">현재가</p>
          <p className="text-xs font-normal text-af-hotPink ">
            {props.currentPrice}원
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListBox;
