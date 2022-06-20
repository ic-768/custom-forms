import { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

import "./SettingsButton.scss";

const SettingsButton = ({ onClick }: { onClick: () => void }): ReactElement => (
  <div className="settings-button" onClick={onClick} tabIndex={0} role="button">
    <FontAwesomeIcon className="settings-button-icon" icon={faCog} />
  </div>
);
export default SettingsButton;
