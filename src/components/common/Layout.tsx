import { motion } from "framer-motion";
import { useTransitionStore } from "../../store/store";
import { twMerge } from "tailwind-merge";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

// Route가 변경될때마다 from에서 to로 슬라이딩하며 트랜지션합니다.
// from이 -1일때 정방향 슬라이딩하며 1일때 역방향으로 슬라이딩합니다.
const Layout = (props: LayoutProps) => {
  const { from, to } = useTransitionStore();

  return (
    <motion.div
      className={twMerge(
        "shrink-0 flex flex-col w-full h-full min-h-screen  bg-white overflow-y-scroll",
        props.className
      )}
      initial={{
        x: `${100 * from}%`,
        opacity: 1,
        position: "absolute",
        height: window.innerHeight,
      }}
      animate={{
        x: 0,
        opacity: 1,
        position: "static",
        transitionEnd: {
          x: 0,
        },
      }}
      onAnimationComplete={() => {
        // changeOnTransition(false);
      }}
      exit={{ x: `${100 * to}%`, opacity: 1, position: "absolute" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {props.children}
    </motion.div>
  );
};

export default Layout;
