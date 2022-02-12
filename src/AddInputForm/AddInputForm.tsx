import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputOptions from "./InputOptions";

import DropdownInput from "../inputs/inputComponents/DropdownInput";

import { getInputIcon, inputsForDropdown } from "../inputs/helpers";
import { inputTypes, ICustomInput } from "../inputs/resources";
import { IInputOption } from "../options/types";

import "./AddInputForm.scss";

interface IAddInputForm {
  addInput: (input: ICustomInput) => void;
}

const AddInputForm = ({ addInput }: IAddInputForm) => {
  const navigate = useNavigate();
  const [inputType, setInputType] = useState<typeof inputTypes[number] | null>(
    null
  );

  // to hold all style modifications for currently edited input
  const [inputOptions, setInputOptions] = useState<IInputOption | null>({
    borderRadius: 0,
  });

  const onSave = () => {
    if (inputType) addInput({ inputType: inputType, options: {} });
  };

  const onCancel = () => navigate("/");

  return (
    <div className="edit-panel">
      <div className="edit-panel-options-container">
        <DropdownInput
          label="Choose an input type"
          placeholder="-- Choose an input type --"
          options={inputsForDropdown}
          onChange={setInputType}
          selection={inputType}
          selectionIcon={getInputIcon(inputType)}
        />
        {inputType && (
          <InputOptions
            input={inputType}
            options={inputOptions}
            onChange={setInputOptions}
          />
        )}
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
