import { BsShare, BsArrowLeft, BsPerson, BsPlusLg } from "react-icons/bs";
import TransitionLink from "./TransitionLink";

interface HeaderProps {
  main?: boolean;
}

const Header = (props: HeaderProps) => {
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
          {/* 임시 userId 1 */}
          <TransitionLink to={`/user/${1}`}>
            <BsPerson size={24} />
          </TransitionLink>
        </div>
      </>
    );
  }
  return (
    <header className="z-50 flex p-2 justify-between shrink-0 w-full  h-10 bg-white fixed top-0">
      {header}
    </header>
  );
};

export default Header;
