import { getInputIcon } from "./helpers";
import InputModifiersList from "./InputModifiersList";
import { DropdownInput } from "../../../../components/inputs/inputComponents";
import { inputsForDropdown } from "./helpers";
import { IEditedInput, IForm } from "../../resources/shared";
import { ICustomInput } from "../../../../components/inputs/CustomInput";

import "./InputEditor.scss";

/**
 * Used to customise a a form input.
 */
interface IInputEditor {
  editedInput: IEditedInput;
  setEditedInput: (input: IEditedInput) => void;
  form: IForm;
  setForm: (form: any) => void;
}

const InputEditor = ({
  editedInput,
  setEditedInput,
  form,
  setForm,
}: IInputEditor) => {
  if (!editedInput) return null;

  // replace form's input with newly edited one
  const onUpdateForm = (input: ICustomInput) => {
    if (input) {
      setForm({
        ...form,
        inputs: form.inputs.map((i, idx) =>
          idx === editedInput.index ? input : i
        ),
      });
    }
  };

  const onSave = () => {
    onUpdateForm({ ...editedInput.input });
    setEditedInput(null);
  };

  const onCancel = () => {
    setEditedInput(null);
  };

  // edit input - keep index
  const editInput = (input: ICustomInput) => {
    setEditedInput({ index: editedInput.index, input });
  };

  // When changing input type, we keep the label and the id
  const onInputTypeSelect = (t: string) =>
    editInput({
      type: t,
      label: editedInput.input.label,
      id: editedInput.input.id,
    } as ICustomInput);

  return (
    <div className="input-editor">
      <div className="input-editor-options-container">
        <DropdownInput
          label="Choose an input type"
          placeholder="-- Choose an input type --"
          options={inputsForDropdown}
          onChange={onInputTypeSelect}
          selection={editedInput.input.type}
          selectionIcon={getInputIcon(editedInput.input.type!)}
        />
        {editedInput && (
          <InputModifiersList
            input={editedInput.input}
            onChangeModifiers={editInput}
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