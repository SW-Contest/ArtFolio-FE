import React, { useEffect } from "react";
import { BsHeartFill } from "react-icons/bs";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import { useAnimationStore } from "../../../store/store";
import { useStore } from "zustand";

const HeartAnimation = () => {
  const [scope, animate] = useAnimate();
  const useAnimation = useStore(useAnimationStore);

  const hideHeartHandler = () => {
    useAnimation.hideAnimation();
  };

  const animation = async () => {
    await animate(
      scope.current,
      {
        opacity: 1,
        scale: 1,
      },
      {
        type: "spring",
        duration: 0.3,
      }
    );
    await animate(
      scope.current,
      {
        opacity: 0,
        scale: 0.01,
      },
      { delay: 0.1, ease: "easeIn", duration: 0.3 }
    );

    hideHeartHandler();
  };

  useEffect(() => {
    animation();
  }, []);

  return (
    <motion.div
      initial={{
        opacity: 0.2,
        scale: 0.01,
        translateX: "-50%",
        translateY: "-50%",
      }}
      ref={scope}
      className="z-[999] fixed top-1/2 left-1/2"
    >
      <BsHeartFill className="fill-af-hotPink" size={200} />
    </motion.div>
  );
};

export default HeartAnimation;
