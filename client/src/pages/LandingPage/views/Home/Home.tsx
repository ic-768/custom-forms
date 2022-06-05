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
  </div>
);

export default Home;
