import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./views/Home";
import LandingPageHeader from "./components/LandingPageHeader";
import CredentialsPanel from "./components/CredentialsPanel";
import useSignup from "./hooks/useSignup";
import useLogin from "./hooks/useLogin";

import "./LandingPage.scss";

const LandingPage = (): ReactElement => (
  <div
    style={{ backgroundImage: "url('/images/background.png')" }}
    className="landing-page-container"
  >
    <LandingPageHeader />
    <Routes>
      <Route
        path="signup"
        element={<CredentialsPanel action={useSignup()} />}
      />
      <Route path="login" element={<CredentialsPanel action={useLogin()} />} />
      <Route path="*" element={<Home />} />
    </Routes>
  </div>
);

export default LandingPage;
