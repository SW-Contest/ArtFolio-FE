import { BsShare, BsArrowLeft, BsPerson, BsPlusLg } from "react-icons/bs";
import TransitionLink from "./TransitionLink";
import { useUserStore } from "../../store/store";

interface HeaderProps {
  main?: boolean;
}

const Header = (props: HeaderProps) => {
  const { userId } = useUserStore();
  let header = (
    <>
      <div className="flex">
        <TransitionLink to=".." backWard>
          <BsArrowLeft size={24} />
        </TransitionLink>
      </div>
      <div className="flex gap-3">
        <BsShare size={24} />
      </div>
    </>
  );

  // main이 true일 때는 예술품 등록과 유저 프로필이 있는 header를 보여줍니다.
  if (props.main) {
    header = (
      <>
        <div className="flex">
          <TransitionLink to="/artpiece/new">
            <BsPlusLg size={24} />
          </TransitionLink>
        </div>
        <div className="flex gap-3">
          <TransitionLink to={`/user/${userId}`}>
            <BsPerson size={24} />
          </TransitionLink>
        </div>
      </>
    );
  }
  return (
    <header className="z-50 flex p-2 justify-between shrink-0 w-full max-w-[450px]    h-10 bg-white fixed top-0">
      {header}
    </header>
  );
};

export default Header;
