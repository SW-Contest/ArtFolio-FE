import React, { useEffect } from "react";
import { BsHeartFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimationStore } from "../../store/store";
import { useStore } from "zustand";

const HeartAnimation = () => {
  const useAnimation = useStore(useAnimationStore);

  const hideHeartHandler = () => {
    useAnimation.hideAnimation();
  };
  return (
    <AnimatePresence>
      {useAnimation.isShow && (
        <motion.div
          initial={{
            opacity: 0.2,
            scale: 0.01,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 0.01,
            transition: { ease: "easeIn", duration: 0.2 },
          }}
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
