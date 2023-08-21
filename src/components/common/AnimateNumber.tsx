import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

interface AnimateNumberProps {
  count: number;
}
const AnimateNumber = ({ count }: AnimateNumberProps) => {
  const motionCount = useMotionValue(0);

  const rounded = useTransform(motionCount, Math.round);

  useEffect(() => {
    const animation = animate(motionCount, count, {
      duration: 1,
      ease: "easeInOut",
    });

    return animation.stop;
  }, []);

  return <motion.p>{rounded}</motion.p>;
};

export default AnimateNumber;
