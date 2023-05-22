import React, { useEffect } from "react";
import { BsHeartFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

interface HeartAnimationProps {
  isShow: boolean;
  changeShow: () => void;
}
const HeartAnimation = (props: HeartAnimationProps) => {
  useEffect(() => {
    if (props.isShow) {
      setTimeout(() => {
        props.changeShow();
        console.log("change");
      }, 1000);
    }
  }, [props.isShow]);

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
          className="z-[999] fixed top-1/2 left-1/2"
        >
          <BsHeartFill className="fill-af-hotPink" size={200} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeartAnimation;
