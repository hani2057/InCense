import { Navigate, Route, Routes } from "react-router";
import NavBar from "./components/NavBar/NavBar";
// import LogInPage from "./pages/LogInPage/LogInPage";
// import KakaoRedirect from "./components/LogIn/KakaoRedirect/KakaoRedirect";
// import SignUpPage from "./pages/SignUpPage/SignUpPage";
// import MainPage from "./pages/MainPage/MainPage";
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
<<<<<<< HEAD

=======
import { PrivateRoute } from "./components/LogIn/PrivateRoute.js/PrivateRoute";
import WebSocket from "./components/WebSocket"
import { useSelector } from "react-redux";
>>>>>>> 5b2e725b12140d3a89639cffc5e4ff0ed7a45489
function App() {
  const isLoggedIn = useSelector((state) => state.userReducers.isLoggedIn);
  return (
    <>
      {isLoggedIn===true && <WebSocket/>}
      <NavBar />
      <Routes>
        {/* <Route index element={<MainPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/oauth/callback/kakao" element={<KakaoRedirect />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route element={<NavBar />}></Route> */}
        <Route path="/list" element={<ListPage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/share" element={<SharePage />} />
<<<<<<< HEAD
        <Route path="/share/register" element={<RegisterPage />} />
        <Route path="/share/registertest" element={<RegisterOrEdit />} />
        <Route path="/share/article" element={<ArticleDetail />} />
        <Route path="/profile" element={<ProfilePage />}>
=======
        <Route path="/share/register" element={
            <PrivateRoute>
              <RegisterPage />
            </PrivateRoute>
          }/>


        <Route path="/share/article/:articleId" element={<ArticleDetail />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        >
>>>>>>> 5b2e725b12140d3a89639cffc5e4ff0ed7a45489
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
