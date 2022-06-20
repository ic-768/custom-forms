import { ReactElement } from "react";
import classNames from "classnames";

import "./ModeToggle.scss";

type viewMode = "individual" | "summary";
interface IModeToggle {
  viewMode: viewMode;
  setViewMode: (mode: viewMode) => void;
}

const ModeToggle = ({ viewMode, setViewMode }: IModeToggle): ReactElement => {
  const individualToggleClasses = classNames({
    "components-view-mode-toggle": true,
    active: viewMode === "individual",
  });

  const summaryToggleClasses = classNames({
    "components-view-mode-toggle": true,
    active: viewMode === "summary",
  });
  return (
    <div className="components-view-mode-toggle-container">
      <button
        className={individualToggleClasses}
        onClick={(): void => setViewMode("individual")}
      >
        Individual
      </button>
      <button
        className={summaryToggleClasses}
        onClick={(): void => setViewMode("summary")}
      >
        Summary
      </button>
    </div>
  );
};

export default ModeToggle;
