import { motion } from "framer-motion";

interface SlidingMenuProps {
  menus: string[];
  selectedMenu: string;
  setSelectedMenu: (item: string) => void;
}

const SlidingMenu = (props: SlidingMenuProps) => {
  return (
    <ul className="flex w-full">
      {props.menus.map((item) => (
        <li
          key={item}
          className={
            item === props.selectedMenu
              ? "relative flex grow text-af-hotPink"
              : "relative flex grow "
          }
          onClick={() => props.setSelectedMenu(item)}
        >
          <div className="w-full text-center border-b">{item}</div>

          {item === props.selectedMenu ? (
            <motion.div
              className=" z-10 w-full absolute bottom-0 border-b border-af-hotPink "
              layoutId="underline"
            />
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default SlidingMenu;
