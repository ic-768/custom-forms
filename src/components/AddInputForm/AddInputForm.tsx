import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getInputIcon, inputsForDropdown } from "../inputs/helpers";
import InputModifiersList from "./InputModifiersList";
import DropdownInput from "../inputs/inputComponents/DropdownInput";

import { ICustomInput } from "../inputs/resources";
import { IInputStyles } from "../inputs/inputModifiers/types";

import "./AddInputForm.scss";

interface IAddInputForm {
  // add input to the form
  addInput: (input: ICustomInput) => void;
  // currently edited input
  editedInput: ICustomInput | null;
  // change currently edited input
  editInput: (input: ICustomInput | null) => void;
}

const AddInputForm = ({ addInput, editedInput, editInput }: IAddInputForm) => {
  useEffect(() => {
    if (editedInput) editInput({ ...editedInput, styles: {} });
  }, [editedInput?.inputType]);

  const editInputStyles = (styles: IInputStyles) => {
    if (editedInput) editInput({ ...editedInput, styles });
  };

  const onSave = () => {
    if (editedInput) {
      addInput(editedInput);
      // clear previous data to start new input fresh
      editInput(null);
    }
  };

  const navigate = useNavigate();
  const onCancel = () => navigate("/");

  return (
    <div className="edit-panel">
      <div className="edit-panel-options-container">
        <DropdownInput
          label="Choose an input type"
          placeholder="-- Choose an input type --"
          options={inputsForDropdown}
          onChange={(t) => editInput({ inputType: t })}
          selection={editedInput?.inputType || null}
          selectionIcon={getInputIcon(editedInput?.inputType || null)}
        />
        {editedInput && (
          <InputModifiersList
            input={editedInput}
            onChangeStyles={editInputStyles}
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
