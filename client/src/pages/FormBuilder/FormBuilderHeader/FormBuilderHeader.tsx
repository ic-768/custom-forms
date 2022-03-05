import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";

import "./FormBuilderHeader.scss";

const FormBuilderHeader = ({
  user,
  onLogOut,
}: {
  user: string;
  onLogOut: () => void;
}) => (
  <div className="form-builder-header">
    <div className="form-builder-header-user-details">
      <FontAwesomeIcon
        className="form-builder-header-user-icon"
        icon={faUserAstronaut}
      />
      <div>Logged in as {user}</div>
    </div>
    <button className="form-builder-header-sign-out-button" onClick={onLogOut}>
      Sign out
    </button>
  </div>
);

export default FormBuilderHeader;
