import { Routes, Route } from "react-router-dom";
import Test1 from "./Test1";
import Test2 from "./Test2";

function App() {
  return (
    <Routes>
      <Route path="/test1" element={<Test1 />} />
      <Route path="/test2" element={<Test2 />} />
    </Routes>
  );
}

export default App;
