import "./SettingsButton.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

const SettingsButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className="settings-button"
      onClick={onClick}
      tabIndex={0}
      role="button"
    >
      <FontAwesomeIcon className="settings-button-icon" icon={faCog} />
    </div>
  );
};

export default SettingsButton;
