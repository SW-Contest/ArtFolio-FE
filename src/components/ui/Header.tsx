import { BsShare, BsArrowLeft, BsPerson, BsPlusLg } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  main?: boolean;
}

const Header = (props: HeaderProps) => {
  const navigate = useNavigate();

  let header = (
    <>
      <div className="flex">
        <button onClick={() => navigate(-1)}>
          <BsArrowLeft size={24} />
        </button>
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
          <Link to="/artpiece/new">
            <BsPlusLg size={24} />
          </Link>
        </div>
        <div className="flex gap-3">
          {/* 임시 userId 1 */}
          <Link to={`/user/${1}`}>
            <BsPerson size={24} />
          </Link>
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
