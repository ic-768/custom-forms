import { getInputIcon, inputsForDropdown } from "./helpers";
import InputModifiersList from "./InputModifiersList";
import DropdownInput from "../inputs/inputComponents/DropdownInput";
import { ICustomInput } from "../inputs/CustomInput";

import "./InputEditor.scss";

/**
 * Is rendered by ExisingInputEditor or NewInputEditor
 */
interface IInputEditor {
  editedInput: ICustomInput | null;
  editInput: (input: ICustomInput | null) => void;
  onSave: () => void;
  onCancel: () => void;
}

const InputEditor = ({
  editedInput,
  editInput,
  onSave,
  onCancel,
}: IInputEditor) => (
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
        <InputModifiersList input={editedInput} onChangeModifiers={editInput} />
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

export default InputEditor;
