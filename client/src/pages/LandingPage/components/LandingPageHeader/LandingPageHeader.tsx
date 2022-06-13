import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import "./LandingPageHeader.scss";

const LandingPageHeader = () => (
  <div className="landing-page-header">
    <img
      className="landing-page-header-logo"
      src="/images/logo.png"
      alt="logo"
    />
    <Link
      className="landing-page-header-github-link"
      to={"//github.com/ic-768"}
    >
      <FontAwesomeIcon
        title="Link to my github page"
        className="landing-page-header-github-icon"
        icon={faGithub as IconProp}
      />
      <span className="landing-page-header-github-text">GitHub</span>
    </Link>
  </div>
);

export default LandingPageHeader;
