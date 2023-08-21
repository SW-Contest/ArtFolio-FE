import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ArtPieceAISubtitleProps {
  content: string;
}

const ArtPieceAISubtitle = ({ content }: ArtPieceAISubtitleProps) => {
  const subtitle = content.split(".");
  const [subTitleIndex, setSubTitleIndex] = useState<number>(0);

  useEffect(() => {
    // 자막의 현재 인덱스가 자막의 길이보다 작다면
    if (subTitleIndex < subtitle.length) {
      const currentIndex = subTitleIndex;
      // 글자 수 * 130ms 후에 다음 자막으로 넘어갑니다.
      const interval = setTimeout(() => {
        setSubTitleIndex((prev) => prev + 1);
      }, 130 * subtitle[currentIndex].length);
    }
  }, [subTitleIndex]);
  return (
    <div className="flex flex-col grow gap-3 justify-center w-full">
      {subTitleIndex !== 0 && (
        <motion.p
          key={subTitleIndex + "first"}
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className=" text-gray-400 w-full"
        >
          {subtitle[subTitleIndex - 1]}
        </motion.p>
      )}
      <motion.p
        key={subTitleIndex + "middle"}
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className=" text-black font-semibold w-full"
      >
        {subtitle[subTitleIndex]}
      </motion.p>
      {subTitleIndex !== subtitle.length - 1 && (
        <motion.p
          key={subTitleIndex + "last"}
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className=" text-gray-400 w-full"
        >
          {subtitle[subTitleIndex + 1]}
        </motion.p>
      )}
    </div>
  );
};

export default ArtPieceAISubtitle;
