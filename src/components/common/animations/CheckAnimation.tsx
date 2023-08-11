import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useStore } from "zustand";
import checkAnimation from "../../../lotties/checkAnimation.json";
import { useAnimationStore } from "../../../store/store";

const HeartAnimation = () => {
  const useAnimation = useStore(useAnimationStore);

  const hideHeartHandler = () => {
    useAnimation.hideAnimation();
  };

  return (
    <motion.div
      initial={{
        scale: 2,
        translateX: "-50%",
        translateY: "-50%",
      }}
      exit={{ opacity: 0 }}
      className="z-[999] fixed top-1/2 left-1/2"
    >
      <Lottie
        loop={false}
        onComplete={hideHeartHandler}
        animationData={checkAnimation}
      />
    </motion.div>
  );
};

export default HeartAnimation;
