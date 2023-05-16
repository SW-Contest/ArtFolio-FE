import React from "react";
import UserIcon from "../ui/UserIcon";
import { motion } from "framer-motion";
import { artistInfoProps } from "../../mocks/dummyList";

interface ArtistInfoProps {
  artistInfo: artistInfoProps;
}
const ArtistInfo = (props: ArtistInfoProps) => {
  return (
    <article className="flex items-center w-full gap-4 p-4 mb-4 rounded-md bg-af-lightGray">
      <UserIcon url="/src/assets/img/cat.jpeg" />
      <div className="flex flex-col justify-between grow">
        <p className="text-sm font-bold truncate ">{props.artistInfo.name}</p>

        <p className="text-xs font-light">좋아요 {props.artistInfo.like}</p>
      </div>
      <motion.button
        initial={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="border-0 rounded-full px-2 py-1 text-white bg-af-hotPink "
      >
        작가 Home
      </motion.button>
    </article>
  );
};

export default ArtistInfo;
