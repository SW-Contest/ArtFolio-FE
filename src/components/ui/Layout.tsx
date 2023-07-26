import { motion } from "framer-motion";
import { useTransitionStore } from "../../store/store";

interface LayoutProps {
  children: React.ReactNode;
}

// Route가 변경될때마다 from에서 to로 슬라이딩하며 트랜지션합니다.
// from이 -1일때 정방향 슬라이딩하며 1일때 역방향으로 슬라이딩합니다.
const Layout = (props: LayoutProps) => {
  const { from, to, transitionBackward } = useTransitionStore();

  // 뒤로가기 버튼을 눌렀을때 역방향으로 슬라이딩합니다.
  window.onpopstate = (e) => {
    transitionBackward();
  };

  return (
    <motion.div
      className=" flex flex-col w-full h-full min-h-screen  bg-white overflow-y-scroll "
      initial={{
        x: `${100 * from}%`,
        opacity: 1,
        position: "absolute",
      }}
      animate={{
        x: 0,
        opacity: 1,
        position: "static",
        transitionEnd: {
          x: 0,
        },
      }}
      exit={{ x: `${100 * to}%`, opacity: 1, position: "absolute" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {props.children}
    </motion.div>
  );
};

export default Layout;
