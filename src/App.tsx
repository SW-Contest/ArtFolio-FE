import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AuctionPage from "./pages/AuctionPage";
import AuctionDetailPage from "./pages/AuctionDetailPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import NewArtPiecePage from "./pages/NewArtPiecePage";
import AuthPage from "./pages/AuthPage";
import AnimationController from "./components/common/animations/AnimationController";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "./components/common/Header";
import DetailFooter from "./components/auction/auctionDetailContent/detailFooter/DetailFooter";
import {
  useTransitionStore,
  useAnimationStore,
  useUserStore,
} from "./store/store";
import ArtDetailPage from "./pages/ArtPieceDetailPage";
import axios from "axios";
import PublicRoute from "./components/common/PublicRoute";
import PrivateRoute from "./components/common/PrivateRoute";
import NewAuctionPage from "./pages/NewAuctionPage";
function App() {
  // // axios를 통해 API를 호출할 때 헤더에 토큰을 자동으로 넣어줍니다.
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${sessionStorage.getItem("accessToken")}`;

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
  const { userId, setUserId } = useUserStore();

  // 브라우저의 뒤로가기 버튼을 눌렀을때, 헤더의 뒤로가기 버튼을 누른것처럼 보이게 하기 위한 코드입니다.
  // TODO: 이 코드는 불안정하므로, 추후 개선이 필요함
  // -----
  history.pushState(null, "", location.pathname);

  window.onpopstate = () => {
    history.go(1);
    if (!isShow && !onTransition && location.pathname !== "/") {
      const recent = location.pathname;
      toggleTransition();
      transitionBackward();
      navigate(recentPage);
      if (recentPage === "/") {
        setRecentPage(recent);
      } else {
        setRecentPage("/");
      }
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
      <AnimationController />
      {location.pathname !== "/login" && (
        <Header main={location.pathname === "/"} />
      )}

      {/* <div className="absolute top-0 left-0">
        <p>{recentPage}</p>
        <p>onTransition : {String(onTransition)}</p>
        <p>
          {to} {from}
        </p>
        <p>isShow : {String(isShow)}</p>
        <button
          onClick={() => {
            if (!isShow) showAnimation("success");
          }}
        >
          애니메이션
        </button>
      </div> */}

      <section
        id="page"
        className="relative flex w-full max-w-[400px] h-full overflow-hidden bg-white"
      >
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/login"
              element={<PublicRoute element={<LoginPage />} />}
            />
            <Route
              path="/"
              element={<PrivateRoute element={<AuctionPage />} />}
            />
            <Route
              path="/auction/:auctionId"
              element={<PrivateRoute element={<AuctionDetailPage />} />}
            />
            <Route
              path="/auction/new"
              element={<PrivateRoute element={<NewAuctionPage />} />}
            />
            <Route
              path="/auth/:provider"
              element={<PublicRoute element={<AuthPage />} />}
            />
            <Route
              path="/user/:userId"
              element={<PrivateRoute element={<UserPage />} />}
            />
            <Route
              path="/artpiece/new"
              element={<PrivateRoute element={<NewArtPiecePage />} />}
            />

            <Route
              path="/artpiece/:artPieceId"
              element={<PrivateRoute element={<ArtDetailPage />} />}
            />
          </Routes>
        </AnimatePresence>
      </section>

      <AnimatePresence>
        {location.pathname.split("/")[1] === "auction" &&
          location.pathname.split("/")[2] !== "new" && <DetailFooter />}
      </AnimatePresence>
    </div>
  );
}

export default App;
