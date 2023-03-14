import { Route, Routes } from "react-router";
import MainPage from "./pages/MainPage/MainPage";
import LogInPage from "./pages/LogInPage/LogInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

function App() {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;
