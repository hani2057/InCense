import { Route, Routes } from "react-router";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

function App() {
  return (
    <Routes>
      {/* <Route index element={<MainPage />} /> */}
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;
