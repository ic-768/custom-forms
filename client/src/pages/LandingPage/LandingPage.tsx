import { Route, Routes } from "react-router-dom";

import LoginPanel from "./views/LoginPanel";
import SignupPanel from "./views/SignupPanel";
import LandingPageHeader from "./components/LandingPageHeader";

import "./LandingPage.scss";

const LandingPage = () => (
  <div
    className="landing-page-container"
    style={{
      backgroundImage: "url(/images/background.png)",
    }}
  >
    <LandingPageHeader />
    <Routes>
      <Route path="signup" element={<SignupPanel />} />
      <Route path="login" element={<LoginPanel />} />
      <Route path="*" element={null} />
    </Routes>
  </div>
);
export default LandingPage;
