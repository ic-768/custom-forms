import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import DropdownInput from "./inputs/inputComponents/DropdownInput";
import { getInputIcon, inputsForDropdown } from "./inputs/helpers";
import { inputTypes, ICustomInput } from "./inputs/resources";

import "./AddInputForm.scss";

interface IAddInputForm {
  addInput: (input: ICustomInput) => void;
}

const AddInputForm = ({ addInput }: IAddInputForm) => {
  const navigate = useNavigate();
  const [inputType, setInputType] = useState<typeof inputTypes[number] | null>(
    null
  );

  const onSave = () => {
    if (inputType) addInput({ inputType: inputType, styles: {} });
  };

  const onCancel = () => navigate("/");
  return (
    <div className="edit-panel">
      <div className="edit-panel-options-container">
        <div className="edit-panel-option-container">
          <label className="edit-panel-option-label">
            <DropdownInput
              label="Choose a value please"
              placeholder="-- Choose an input type --"
              options={inputsForDropdown}
              onChange={setInputType}
              selection={inputType}
              selectionIcon={getInputIcon(inputType)}
            />
          </label>
        </div>
        <div className="edit-panel-buttons-container">
          <button onClick={onSave} className="edit-panel-save">
            Save
          </button>
          <button onClick={onCancel} className="edit-panel-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddInputForm;
