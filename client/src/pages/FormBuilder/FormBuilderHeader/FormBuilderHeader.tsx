import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";

import "./FormBuilderHeader.scss";

const FormBuilderHeader = ({
  user,
  setUser,
  setToken,
}: {
  user: string;
  setUser: (user: string) => void;
  setToken: (token: string) => void;
}) => {
  const navigate = useNavigate();

  const onLogOut = () => {
    window.localStorage.removeItem("loggedUser");
    setUser("");
    setToken("");
    navigate("/");
  };
  return (
    <div className="form-builder-header">
      <div className="form-builder-header-user-details">
        <FontAwesomeIcon
          className="form-builder-header-user-icon"
          icon={faUserAstronaut}
        />
        <div>Logged in as {user}</div>
      </div>
      <button
        className="form-builder-header-sign-out-button"
        onClick={onLogOut}
      >
        Sign out
      </button>
    </div>
  );
};

export default FormBuilderHeader;
