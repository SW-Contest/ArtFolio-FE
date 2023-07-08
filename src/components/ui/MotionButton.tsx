import React from "react";
import { motion } from "framer-motion";

interface MotionButtonProps {
  htmlFor?: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

// 클릭 시 눌리는 효과가 있는 버튼
const MotionButton = (props: MotionButtonProps) => {
  return (
    <motion.button
      onClick={props.onClick}
      initial={{ scale: 1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={props.className}
    >
      {props.children}
    </motion.button>
  );
};

export default MotionButton;
