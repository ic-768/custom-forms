import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import InputModifiersList from "./InputModifiersList";

import DropdownInput from "../inputs/inputComponents/DropdownInput";

import { getInputIcon, inputsForDropdown } from "../inputs/helpers";
import { inputTypes, ICustomInput } from "../inputs/resources";

import "./AddInputForm.scss";
import { IInputModifiers } from "../inputs/inputModifiers/types";

interface IAddInputForm {
  // add input to the form
  addInput: (input: ICustomInput) => void;
  // currently edited input type
  editedInputType: typeof inputTypes[number];
  // change currently edited input type
  editInputType: (type: typeof inputTypes[number]) => void;
  // currently edited input options
  editedInputModifiers?: IInputModifiers;
  // change edited input options
  editInputModifiers: (options: IInputModifiers) => void;
}

const AddInputForm = ({
  addInput,
  editedInputType,
  editInputType,
  editedInputModifiers,
  editInputModifiers,
}: IAddInputForm) => {
  useEffect(() => {
    editInputModifiers({});
  }, [editedInputType]);

  const navigate = useNavigate();

  const onSave = () => {
    if (editedInputType) {
      addInput({
        inputType: editedInputType,
        modifiers: editedInputModifiers,
      });
      // clear previous data to start new input fresh
      editInputType("");
    }
  };

  const onCancel = () => navigate("/");

  return (
    <div className="edit-panel">
      <div className="edit-panel-options-container">
        <DropdownInput
          label="Choose an input type"
          placeholder="-- Choose an input type --"
          options={inputsForDropdown}
          onChange={editInputType}
          selection={editedInputType}
          selectionIcon={getInputIcon(editedInputType)}
        />
        {editedInputType && (
          <InputModifiersList
            input={editedInputType}
            onChange={editInputModifiers}
            modifiers={editedInputModifiers}
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
