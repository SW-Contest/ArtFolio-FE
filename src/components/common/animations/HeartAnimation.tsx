import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useStore } from "zustand";
import heartAnimation from "../../../lotties/heartAnimation.json";
import { useAnimationStore } from "../../../store/store";

const HeartAnimation = () => {
  const useAnimation = useStore(useAnimationStore);

  const hideHeartHandler = () => {
    useAnimation.hideAnimation();
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-60 h-60 z-[999]"
    >
      <Lottie
        loop={false}
        onComplete={hideHeartHandler}
        animationData={heartAnimation}
      />
    </motion.div>
  );
};

export default HeartAnimation;
