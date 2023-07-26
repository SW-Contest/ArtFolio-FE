import { Routes, Route, useLocation } from "react-router-dom";
import AuctionPage from "./pages/AuctionPage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import NewArtPiecePage from "./pages/NewArtPiecePage";
import HeartAnimation from "./components/ui/HeartAnimation";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "./components/ui/Header";
import DetailFooterTest from "./components/detail/detailContent/detailFooter/DetailFooter";

function App() {
  const location = useLocation();

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
      <HeartAnimation />
      {location.pathname !== "/login" && (
        <Header main={location.pathname === "/"} />
      )}

      <section className="relative flex flex-col w-[400px] h-full bg-white overflow-hidden ">
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AuctionPage />} />
            <Route path="/auction/:auctionId" element={<DetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user/:userId" element={<UserPage />} />
            <Route path="/artpiece/new" element={<NewArtPiecePage />} />
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
