import classNames from "classnames";

import "./ModeToggle.scss";

const ModeToggle = ({
  viewMode,
  setViewMode,
}: {
  viewMode: "individual" | "summary";
  setViewMode: (mode: "individual" | "summary") => void;
}) => {
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
      <span
        className={individualToggleClasses}
        onClick={() => setViewMode("individual")}
      >
        Individual
      </span>
      <span
        className={summaryToggleClasses}
        onClick={() => setViewMode("summary")}
      >
        Summary
      </span>
    </div>
  );
};

export default ModeToggle;
