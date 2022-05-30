import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import "./Home.scss";

const Home = () => (
  <div className="home-view-container">
    <div className="home-view-intro">
      <span className="home-view-intro-title">Custom Forms</span>
      <span className="home-view-intro-subtitle">
        100% creative control over your survey experience.
      </span>
      <div className="home-view-intro-get-started-container">
        <span className="home-view-intro-get-started-text">
          Get started now
        </span>
        <div className="home-view-intro-link-container">
          <Link className="home-view-intro-link" to={"/login"}>
            <span className="home-view-intro-link-text">Log in</span>
          </Link>
          <span className="home-view-intro-link-slash">/</span>
          <Link className="home-view-intro-link" to={"/signup"}>
            <span className="home-view-intro-link-text">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
    <img className="home-view-form-image" src="images/cropped.png" alt="" />
    <svg className="home-view-image-top-dot" height="100" width="100">
      <circle cx="50" cy="50" r="26" fill="#f067ff" />
    </svg>
    <svg className="home-view-image-bottom-dot" height="100" width="100">
      <circle cx="50" cy="50" r="20" fill="#8d5eff" />
    </svg>

    <div className="home-view-descriptions-column">
      <div className="home-view-description-section">
        <div className="home-view-description-section-text-section">
          <div className="home-view-rocket-icon-container">
            <FontAwesomeIcon
              icon={faRocket}
              className="home-view-rocket-icon"
            />
          </div>
          <div className="home-view-description-section-text-section">
            <span className="home-view-description-title">Quick Start</span>
            <span className="home-view-description-text">
              Share personalized forms with your audience in a matter of
              moments, using feature-rich and endlessly customisable input types
              and form components.
            </span>
          </div>
        </div>
        <img
          className="home-view-description-image"
          src="images/inputTypes.png"
          alt=""
        />
      </div>

      <div className="home-view-centered-description-section">
        <span className="home-view-description-centered-title">
          Complete creative freedom
        </span>
        <span>
          Finally be able to fully communicate with your respondents and design
          your survey exactly how you want it
        </span>
      </div>
    </div>
  </div>
);

export default Home;
