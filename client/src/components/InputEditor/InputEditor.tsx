import { getInputIcon, inputsForDropdown } from "../inputs/helpers";
import InputModifiersList from "./InputModifiersList";
import DropdownInput from "../inputs/inputComponents/DropdownInput";

import { ICustomInput } from "../inputs/resources";
import { IInputProps } from "../inputs/inputModifiers/types";

import "./InputEditor.scss";

interface IInputEditor {
  // currently edited input
  editedInput: ICustomInput | null;
  // modify currently edited input
  editInput: (input: ICustomInput | null) => void;
  onSave: () => void;
  onCancel: () => void;
}

const InputEditor = ({
  editedInput,
  editInput,
  onSave,
  onCancel,
}: IInputEditor) => {
  // Clear old data to start editing new input
  const editInputProps = (props: IInputProps) => editInput(props);

  return (
    <div className="input-editor">
      <div className="input-editor-options-container">
        <DropdownInput
          label="Choose an input type"
          placeholder="-- Choose an input type --"
          options={inputsForDropdown}
          onChange={(t) => editInput({ type: t } as ICustomInput)}
          selection={editedInput?.type || null}
          selectionIcon={editedInput?.type && getInputIcon(editedInput.type)}
        />
        {editedInput && (
          <InputModifiersList
            input={editedInput}
            onChangeModifiers={editInputProps}
          />
        )}
        <div className="input-editor-buttons-container">
          <button onClick={onSave} className="input-editor-save">
            Save
          </button>
          <button onClick={onCancel} className="input-editor-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputEditor;
