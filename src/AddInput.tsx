import React, { useState } from "react";

import Dropdown from "./inputs/Dropdown";
import { getInputIcon, inputsForDropdown } from "./helpers/inputs";

import "./AddInput.css";

const Edit = () => {
  const [inputType, setInputType] = useState<string | null>(null);

  return (
    <div className="edit-panel">
      <div className="edit-panel-options-container">
        <label className="edit-panel-option-label" htmlFor="input-type">
          Input type
        </label>
        <Dropdown
          id="input-type"
          placeholder="-- Choose an input type --"
          options={inputsForDropdown}
          onChange={setInputType}
          selection={inputType}
          selectionIcon={getInputIcon(inputType)}
        />

        <div className="edit-panel-buttons-container">
          <button className="edit-panel-save">Save</button>
          <button className="edit-panel-cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
