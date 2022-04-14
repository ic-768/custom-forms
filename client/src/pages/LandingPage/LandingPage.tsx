import { Route, Routes } from "react-router-dom";

import Home from "./views/Home";
import LoginPanel from "./views/LoginPanel";
import SignupPanel from "./views/SignupPanel";
import LandingPageHeader from "./components/LandingPageHeader";

import "./LandingPage.scss";

const LandingPage = () => (
  <div
    style={{ backgroundImage: "url('/images/background.png')" }}
    className="landing-page-container"
  >
    <LandingPageHeader />
    <Routes>
      <Route path="signup" element={<SignupPanel />} />
      <Route path="login" element={<LoginPanel />} />
      <Route path="*" element={<Home />} />
    </Routes>
  </div>
);
export default LandingPage;
