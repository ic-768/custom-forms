import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setToken } from "../../../../services/forms";
import { removeUser } from "../../../../store/features/user/userSlice";

import "./FormBuilderHeader.scss";

const FormBuilderHeader = () => {
  const username = useAppSelector((state) => state.user.username);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogOut = () => {
    window.localStorage.removeItem("loggedUser");
    dispatch(removeUser());
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
        <span>{username}</span>
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
