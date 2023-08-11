import { useAnimationStore } from "../../../store/store";
import HeartAnimation from "./HeartAnimation";
import LoadingAnimation from "./LoadingAnimation";
import CheckAnimation from "./CheckAnimation";
import { AnimatePresence } from "framer-motion";

const AnimationController = () => {
  const { isShow, type } = useAnimationStore();
  return (
    <AnimatePresence>
      {isShow && type === "heart" && <HeartAnimation />}
      {isShow && type === "success" && <CheckAnimation />}
      {isShow && type === "loading" && <LoadingAnimation />}
    </AnimatePresence>
  );
};

export default AnimationController;
