import { Route, Routes } from "react-router";
import MainPage from "./pages/MainPage/MainPage";
import LogInPage from "./pages/LogInPage/LogInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ListPage from "./pages/ListPage/ListPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import SharePage from "./pages/SharePage/SharePage";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/share" element={<SharePage />} />
      </Routes>
    </>
  );
}

export default App;
