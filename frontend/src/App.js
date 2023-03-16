import { Route, Routes } from "react-router";
import LogInPage from "./pages/LogInPage/LogInPage";
import ListPage from "./pages/ListPage/ListPage";
import DetailPage from "./pages/DetailPage/DetailPage";


function App() {
  return (
    <Routes>
      {/* <Route index element={<MainPage />} /> */}
      <Route path="/login" element={<LogInPage />} />
      <Route path="/list" element={<ListPage />} />
      <Route path="/detail" element={<DetailPage />} />

    </Routes>
  );
}

export default App;
