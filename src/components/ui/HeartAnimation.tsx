import React, { useEffect } from "react";
import { BsHeartFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

interface HeartAnimationProps {
  isShow: boolean;
  hideHeartAnimation: () => void;
}
const HeartAnimation = (props: HeartAnimationProps) => {
  let heartTimer: any;

  const hideHeartHandler = () => {
    clearTimeout(heartTimer);
    heartTimer = setTimeout(props.hideHeartAnimation, 500);
  };
  return (
    <AnimatePresence>
      {props.isShow && (
        <motion.div
          initial={{
            opacity: 0.5,
            scale: 0.1,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          onAnimationComplete={hideHeartHandler}
          className="z-[999] fixed top-1/2 left-1/2"
        >
          <BsHeartFill className="fill-af-hotPink" size={200} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeartAnimation;
