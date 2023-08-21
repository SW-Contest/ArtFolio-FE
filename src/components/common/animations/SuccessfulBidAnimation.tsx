import { motion } from "framer-motion";

const SuccessfulBidAnimation = () => {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60   z-[999]"
    >
      <motion.img
        initial={{ scale: 5 }}
        animate={{ scale: 1 }}
        src="/img/successful.png"
      />
    </motion.div>
  );
};

export default SuccessfulBidAnimation;
