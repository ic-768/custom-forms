import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import InputOptions from "./InputOptions";

import DropdownInput from "../inputs/inputComponents/DropdownInput";

import { getInputIcon, inputsForDropdown } from "../inputs/helpers";
import { inputTypes, ICustomInput } from "../inputs/resources";
import { IInputOption } from "../options/types";

import "./AddInputForm.scss";

interface IAddInputForm {
  // add input to the form
  addInput: (input: ICustomInput) => void;
  // currently edited input type
  editedInputType: typeof inputTypes[number];
  // change currently edited input type
  editInputType: (type: typeof inputTypes[number]) => void;
  // currently edited input options
  editedInputOptions?: IInputOption;
  // change edited input options
  editInputOptions: (options: IInputOption) => void;
}

const AddInputForm = ({
  addInput,
  editedInputType,
  editInputType,
  editedInputOptions,
  editInputOptions,
}: IAddInputForm) => {
  useEffect(() => {
    editInputOptions({});
  }, [editedInputType]);

  const navigate = useNavigate();

  const onSave = () => {
    if (editedInputType) {
      addInput({
        inputType: editedInputType,
        options: editedInputOptions || {},
      });
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
          <InputOptions
            input={editedInputType}
            options={editedInputOptions || null}
            onChange={editInputOptions}
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
