import { Route, Routes } from "react-router";
import LogInPage from "./pages/LogInPage/LogInPage";
import ListPage from "./pages/ListPage/ListPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import SharePage from "./pages/SharePage/SharePage";


function App() {
  return (
    <Routes>
      {/* <Route index element={<MainPage />} /> */}
      <Route path="/login" element={<LogInPage />} />
      <Route path="/list" element={<ListPage />} />
      <Route path="/detail" element={<DetailPage />} />
      <Route path="/share" element={<SharePage />} />


    </Routes>
  );
}

export default App;
