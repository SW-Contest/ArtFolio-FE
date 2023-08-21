import { useAnimationStore } from "../../../store/store";
import HeartAnimation from "./HeartAnimation";
import LoadingAnimation from "./LoadingAnimation";
import CheckAnimation from "./CheckAnimation";
import { AnimatePresence } from "framer-motion";
import SuccessfulBidAnimation from "./successfulBidAnimation";

const AnimationController = () => {
  const { isShow, type } = useAnimationStore();
  return (
    <AnimatePresence mode="wait">
      {isShow && type === "heart" && <HeartAnimation />}
      {isShow && type === "success" && <CheckAnimation />}
      {isShow && type === "loading" && <LoadingAnimation />}
      {isShow && type === "successfulBid" && <SuccessfulBidAnimation />}
    </AnimatePresence>
  );
};

export default AnimationController;
