import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export interface ListBoxProps {
  id: number;
  artist: string;
  title: string;
  curPrice: number;
  timeLeft: Date;
}

const ListBox = (props: ListBoxProps) => {
  const navigate = useNavigate();
  const [time, setTime] = useState("");

  useEffect(() => {
    tick();
    const timeId = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(timeId);
    };
  }, []);

  const getTimeLeft = () => {
    const curTime = new Date();
    const timeDiff = Math.abs(curTime.getTime() - props.timeLeft.getTime());
    let hours: string | number = Math.floor(timeDiff / 3600000);
    let minutes: string | number = Math.floor((timeDiff % 3600000) / 60000);
    let seconds: string | number = Math.floor((timeDiff % 60000) / 1000);

    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;
    if (hours < 10) hours = `0${hours}`;

    const timeLeft = hours + ":" + minutes + ":" + seconds;

    return timeLeft;
  };

  const tick = () => {
    setTime(() => getTimeLeft());
  };

  const clickHandler = () => {
    navigate(`/list/${props.id}`);
  };

  return (
    <div
      onClick={clickHandler}
      className="flex flex-col h-60  rounded-lg w-44 mb-4"
    >
      <img
        className="flex grow object-cover rounded-lg w-full "
        src="/src/assets/img/penguin.jpeg"
      />
      <p className=" font-semibold text-sm truncate">{props.artist}</p>
      <p className="w-full font-normal text-sm mb-1 truncate">{props.title}</p>
      <p className=" font-semibold text-sm">{props.curPrice}원</p>
      <p className=" font-normal text-xs text-gray-400 mb-1">현재가</p>
      <p className=" font-bold text-center">{time}</p>
    </div>
  );
};

export default ListBox;
