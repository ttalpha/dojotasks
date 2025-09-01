import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRoute } from "./utils/routes";
import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";
import { Toaster } from "./components/ui/toaster";
import HomePage from "./pages/home";

export default function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Home} element={<HomePage />} />
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route path={AppRoute.Signup} element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
