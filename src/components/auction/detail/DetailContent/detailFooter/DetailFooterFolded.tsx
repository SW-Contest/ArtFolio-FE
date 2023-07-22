import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AuctionInfo } from "../../../../../types/auction.type";

interface DetailFooterFoldedProps {
  auctionInfo: AuctionInfo;
}

const DetailFooterFolded = (props: DetailFooterFoldedProps) => {
  const [time, setTime] = useState("");

  const tick = () => {
    setTime(() => getTimeLeft());
  };

  // 경매 종료 남은 시간을 갱신합니다.
  useEffect(() => {
    tick();
    const timeId = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(timeId);
    };
  }, []);

  // 남은 시간을 포맷팅합니다.
  const getTimeLeft = () => {
    const curTime = new Date();
    const endTime = new Date(props.auctionInfo.finishedAt);
    const timeDiff = Math.abs(curTime.getTime() - endTime.getTime());
    let hours: string | number = Math.floor(timeDiff / 3600000);
    let minutes: string | number = Math.floor((timeDiff % 3600000) / 60000);
    let seconds: string | number = Math.floor((timeDiff % 60000) / 1000);

    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;
    if (hours < 10) hours = `0${hours}`;

    const timeLeft = hours + ":" + minutes + ":" + seconds;

    return timeLeft;
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center w-full"
    >
      <p className="font-normal text-black text-md">경매 종료까지 남은 시간</p>
      <p className="h-10 text-4xl font-semibold text-center text-af-hotPink">
        {time}
      </p>
    </motion.section>
  );
};

export default DetailFooterFolded;
