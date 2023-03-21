import { Route, Routes } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import LogInPage from "./pages/LogInPage/LogInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import MainPage from "./pages/MainPage/MainPage";
import ListPage from "./pages/ListPage/ListPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import SharePage from "./pages/SharePage/SharePage";
import ProfilePage from "./pages/Profile/ProfilePage/ProfilePage";
import ProfileMainPage from "./pages/Profile/ProfileMainPage/ProfileMainPage";
import ProfilePerfumePage from "./pages/Profile/ProfilePerfumePage/ProfilePerfumePage";
import ProfileAnalysisPage from "./pages/Profile/ProfileAnalysisPage/ProfileAnalysisPage";
import ProfileActivityPage from "./pages/Profile/ProfileActivityPage/ProfileActivityPage";
import RegisterPage from "./pages/SharePage/RegisterPage";

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
        <Route path="/share/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />}>
          <Route index element={<ProfileMainPage />} />
          <Route path="perfumes" element={<ProfilePerfumePage />} />
          <Route path="analysis" element={<ProfileAnalysisPage />} />
          <Route path="activity" element={<ProfileActivityPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
