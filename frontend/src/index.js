import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import MuiTheme from "./components/MuiTheme/MuiTheme";
import { ThemeProvider } from "@mui/system";
import { GlobalStyle } from "./styles/globalStyle";
import store, { persistor } from "./store";
import App from "./App";
import LogInPage from "./pages/LogInPage/LogInPage";
import KakaoRedirect from "./components/LogIn/KakaoRedirect/KakaoRedirect";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import MainPage from "./pages/MainPage/MainPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <GlobalStyle />
    <ThemeProvider theme={MuiTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route index element={<MainPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/oauth/callback/kakao" element={<KakaoRedirect />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="/*" element={<App />} />
          </Routes>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
