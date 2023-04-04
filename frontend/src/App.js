import { Navigate, Route, Routes } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import ListPage from "./pages/ListPage/ListPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import SharePage from "./pages/SharePage/SharePage";
import ProfilePage from "./pages/Profile/ProfilePage/ProfilePage";
import ProfileMainPage from "./pages/Profile/ProfileMainPage/ProfileMainPage";
import ProfilePerfumePage from "./pages/Profile/ProfilePerfumePage/ProfilePerfumePage";
import ProfileAnalysisPage from "./pages/Profile/ProfileAnalysisPage/ProfileAnalysisPage";
import ProfileActivityPage from "./pages/Profile/ProfileActivityPage/ProfileActivityPage";
import RegisterPage from "./pages/SharePage/RegisterPage";
// import RegisterOrEdit from "./pages/SharePage/RegisterOrEdit";
import ArticleDetail from "./pages/SharePage/ArticleDetail";
import { PrivateRoute } from "./components/LogIn/PrivateRoute.js/PrivateRoute";
import WebSocket from "./components/WebSocket";
import { useSelector } from "react-redux";
import TestPage from "./pages/TestPage/TestPage";
function App() {
  const isLoggedIn = useSelector((state) => state.userReducers.isLoggedIn);
  return (
    <>
      {isLoggedIn === true && <WebSocket />}
      <NavBar />
      <Routes>
        <Route
          path="/test"
          element={
            <PrivateRoute>
              <TestPage />
            </PrivateRoute>
          }
        />
        <Route path="/list" element={<ListPage />} />
        <Route path="/detail/:detailId" element={<DetailPage />} />
        <Route path="/share" element={<SharePage />} />
        <Route
          path="/share/register"
          element={
            <PrivateRoute>
              <RegisterPage />
            </PrivateRoute>
          }
        />
        <Route path="/share/article/:articleId" element={<ArticleDetail />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        >
          <Route index element={<ProfileMainPage />} />
          <Route path="perfumes" element={<ProfilePerfumePage />} />
          <Route path="analysis" element={<ProfileAnalysisPage />} />
          <Route path="activity" element={<ProfileActivityPage />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </>
  );
}

export default App;
