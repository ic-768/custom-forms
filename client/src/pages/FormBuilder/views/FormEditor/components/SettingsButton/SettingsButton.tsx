import { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

import "./SettingsButton.scss";

const SettingsButton = ({ onClick }: { onClick: () => void }): ReactElement => (
  <button className="settings-button" onClick={onClick}>
    <FontAwesomeIcon className="settings-button-icon" icon={faCog} />
  </button>
);
export default SettingsButton;
