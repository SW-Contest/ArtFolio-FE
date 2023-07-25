import { motion } from "framer-motion";

interface RotationButtonProps {
  isExpanded: boolean;
  onChangeisExpanded: () => void;
  children?: React.ReactNode;
}

const RotationButton = (props: RotationButtonProps) => {
  return (
    <motion.button
      initial={{
        rotate: 0,
      }}
      animate={{
        rotate: props.isExpanded ? 180 : 0,
      }}
      transition={{ duration: 0.4 }}
      onClick={props.onChangeisExpanded}
    >
      {props.children}
    </motion.button>
  );
};

export default RotationButton;
