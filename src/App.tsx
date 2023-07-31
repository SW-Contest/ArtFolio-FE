import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AuctionPage from "./pages/AuctionPage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import NewArtPiecePage from "./pages/NewArtPiecePage";
import Animations from "./components/ui/animations/Animations";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "./components/ui/Header";
import DetailFooterTest from "./components/detail/detailContent/detailFooter/DetailFooter";
import { useTransitionStore, useAnimationStore } from "./store/store";
import ArtDetailPage from "./pages/ArtPieceDetailPage";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    to,
    from,
    setRecentPage,
    recentPage,
    onTransition,
    toggleTransition,
    transitionBackward,
  } = useTransitionStore();
  const { isShow, showAnimation } = useAnimationStore();

  // 브라우저의 뒤로가기 버튼을 눌렀을때, 헤더의 뒤로가기 버튼을 누른것처럼 보이게 하기 위한 코드입니다.
  // TODO: 이 코드는 불안정하므로, 추후 개선이 필요함
  // -----
  history.pushState(null, "", location.pathname);

  window.onpopstate = () => {
    history.go(1);
    if (!onTransition && location.pathname !== "/") {
      transitionBackward();
      toggleTransition();
      navigate("/");
    }
  };
  // ------

  const handleResize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative flex justify-center w-screen h-full min-h-screen bg-gray-100 ">
      <Animations />
      {location.pathname !== "/login" && (
        <Header main={location.pathname === "/"} />
      )}

      <div className="absolute  top-0 left-0">
        <p>{recentPage}</p>
        <p>onTransition : {String(onTransition)}</p>
        <p>
          {to} {from}
        </p>
        <p>isShow : {String(isShow)}</p>
        <button
          onClick={() => {
            if (!isShow) showAnimation("loading");
          }}
        >
          애니메이션
        </button>
      </div>

      <section
        id="page"
        className="relative flex  w-[400px] h-full bg-white overflow-hidden"
      >
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AuctionPage />} />
            <Route path="/auction/:auctionId" element={<DetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user/:userId" element={<UserPage />} />
            <Route path="/artpiece/new" element={<NewArtPiecePage />} />
            <Route path="/artpiece/:artPieceId" element={<ArtDetailPage />} />
          </Routes>
        </AnimatePresence>
      </section>

      <AnimatePresence>
        {location.pathname.split("/")[1] === "auction" && <DetailFooterTest />}
      </AnimatePresence>
    </div>
  );
}

export default App;
