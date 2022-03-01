import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import LoginPanel from "../../components/LoginPanel";
import SignupPanel from "../../components/SignupPanel";

import "./LandingPage.scss";

const LandingPage = ({ setUser }: { setUser: (username: string) => void }) => {
  return (
    <div
      className="landing-page-container"
      style={{
        backgroundImage: "url(/images/background.png)",
      }}
    >
      <div className="landing-page-header">
        <img
          className="landing-page-header-logo"
          src="/images/logo.png"
          alt="logo"
        />
        <nav className="landing-page-navigation-links">
          <Link className="landing-page-header-link" to={"/"}>
            <span className="landing-page-header-link-text">Home</span>
          </Link>
          <Link className="landing-page-header-link" to={"/login"}>
            <span className="landing-page-header-link-text">Log in</span>
          </Link>
          <Link className="landing-page-header-link" to={"/signup"}>
            <span className="landing-page-header-link-text">Sign up</span>
          </Link>
          <Link
            className="landing-page-header-link github-link"
            to={"//github.com/ic-768"}
          >
            <FontAwesomeIcon
              className="landing-page-github-icon"
              icon={faGithub as any}
            />
            <span className="landing-page-header-github-text">GitHub</span>
          </Link>
        </nav>
      </div>
      <Routes>
        <Route path="login" element={<LoginPanel setUser={setUser} />} />
        <Route path="signup" element={<SignupPanel />} />
      </Routes>
    </div>
  );
};

export default LandingPage;
