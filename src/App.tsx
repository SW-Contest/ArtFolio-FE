import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <div className="flex justify-center w-screen h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auction/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
