import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="flex justify-center w-screen h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auction/:auctionId" element={<DetailPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
