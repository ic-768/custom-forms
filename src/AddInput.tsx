import React, { useState } from "react";

import DropdownInput from "./inputs/DropdownInput";
import TextInput from "./inputs/TextInput";
import NumberInput from "./inputs/NumberInput";

import { getInputIcon, inputsForDropdown } from "./helpers/inputs";

import "./AddInput.scss";

const Edit = () => {
  const [inputType, setInputType] = useState<string | null>(null);

  return (
    <div className="edit-panel">
      <div className="edit-panel-options-container">
        <div className="edit-panel-option-container">
          <label className="edit-panel-option-label" htmlFor="input-type">
            Input type
          </label>
          <DropdownInput
            id="input-type"
            placeholder="-- Choose an input type --"
            options={inputsForDropdown}
            onChange={setInputType}
            selection={inputType}
            selectionIcon={getInputIcon(inputType)}
          />
        </div>
        <div className="edit-panel-option-container">
          {/*Temporarily using this space to code out all the generic inputs for the app*/}
          <TextInput />
        </div>
        <div className="edit-panel-option-container">
          <NumberInput />
        </div>
        <div className="edit-panel-buttons-container">
          <button className="edit-panel-save">Save</button>
          <button className="edit-panel-cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
