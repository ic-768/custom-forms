import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import "./LandingPageHeader.scss";

const LandingPageHeader = () => (
  <div className="landing-page-header">
    <img
      className="landing-page-header-logo"
      src="/images/logo.png"
      alt="logo"
    />
    <nav className="landing-page-header-navigation-links">
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
          className="landing-page-header-github-icon"
          icon={faGithub as any}
        />
        <span className="landing-page-header-github-text">GitHub</span>
      </Link>
    </nav>
  </div>
);

export default LandingPageHeader;
