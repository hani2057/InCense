import { Route, Routes } from "react-router";
import LogInPage from "./pages/LogInPage/LogInPage";

function App() {
  return (
    <Routes>
      {/* <Route index element={<MainPage />} /> */}
      <Route path="/login" element={<LogInPage />} />
    </Routes>
  );
}

export default App;
