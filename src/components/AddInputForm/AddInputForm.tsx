import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getInputIcon, inputsForDropdown } from "../inputs/helpers";
import InputModifiersList from "./InputModifiersList";
import DropdownInput from "../inputs/inputComponents/DropdownInput";

import { ICustomInput } from "../inputs/resources";
import { IInputProps, IInputStyles } from "../inputs/inputModifiers/types";

import "./AddInputForm.scss";

interface IAddInputForm {
  inputs: ICustomInput[];
  // add input to the form
  addInput: (input: ICustomInput) => void;
  // currently edited input
  editedInput: ICustomInput | null;
  // modify currently edited input
  editInput: (input: ICustomInput | null) => void;
}

const AddInputForm = ({
  inputs,
  addInput,
  editedInput,
  editInput,
}: IAddInputForm) => {
  // Clear old data to start editing new input
  useEffect(() => {
    editInput(null);
  }, [inputs]);

  const editInputStyles = (styles: IInputStyles) =>
    editInput({ ...editedInput, styles });

  const editInputProps = (props: IInputProps) => editInput({ ...props });

  const onSave = () => {
    if (editedInput) {
      addInput(editedInput);
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
          onChange={(t) => editInput({ type: t } as ICustomInput)}
          selection={editedInput?.type || null}
          selectionIcon={getInputIcon(editedInput?.type || null)}
        />
        {editedInput && (
          <InputModifiersList
            input={editedInput}
            onChangeStyles={editInputStyles}
            onChangeProps={editInputProps}
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
