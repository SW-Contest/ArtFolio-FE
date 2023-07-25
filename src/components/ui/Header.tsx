import { BsShare, BsArrowLeft, BsPerson, BsPlusLg } from "react-icons/bs";

interface HeaderProps {
  main?: boolean;
}

const Header = (props: HeaderProps) => {
  let header = (
    <>
      <div className="flex">
        <BsArrowLeft size={24} />
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
          <BsPlusLg size={24} />
        </div>
        <div className="flex gap-3">
          <BsPerson size={24} />
        </div>
      </>
    );
  }
  return (
    <header className="z-50 flex p-2 justify-between shrink-0 w-full max-w-[400px] h-10 bg-white fixed top-0">
      {header}
    </header>
  );
};

export default Header;
