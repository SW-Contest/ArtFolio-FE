import { motion } from "framer-motion";
import { useTransitionStore } from "../../store/store";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { from, to } = useTransitionStore();
  console.log(from, to);
  return (
    <motion.div
      className="absolute flex flex-col w-full h-full min-h-screen  bg-white overflow-y-scroll"
      initial={{
        x: from,
        opacity: 1,
        position: "absolute",
      }}
      animate={{ x: 0, opacity: 1, position: "static" }}
      exit={{ x: to, opacity: 1, position: "absolute" }}
      transition={{ duration: 0.5 }}
    >
      {props.children}
    </motion.div>
  );
};

export default Layout;
