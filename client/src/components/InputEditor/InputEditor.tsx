import { v4 as uuid } from "uuid";

import { getInputIcon } from "./helpers";
import InputModifiersList from "./InputModifiersList";
import DropdownInput from "../inputs/inputComponents/DropdownInput";
import { inputsForDropdown } from "./helpers";
import { IEditedInput, IForm } from "../../pages/FormBuilder/resources/types";
import { ICustomInput } from "../inputs/CustomInput";

import "./InputEditor.scss";

/**
 * Used to customise a a form input.
 */
interface IInputEditor {
  editedInput: { input: ICustomInput; index: number };
  setEditedInput: (input: IEditedInput) => void;
  // Currently edited form
  form: IForm;
  setForm: (form: any) => void;
}

const InputEditor = ({
  editedInput,
  setEditedInput,
  form,
  setForm,
}: IInputEditor) => {
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
    onUpdateForm({ ...editedInput.input, id: uuid() });
    setEditedInput(null);
  };

  const onCancel = () => {
    setEditedInput(null);
  };

  // edit input - keep index
  const editInput = (input: ICustomInput) => {
    setEditedInput({ index: editedInput.index, input });
  };

  // When changing input type, we keep the label
  const onInputTypeSelect = (t: string) =>
    editInput({ type: t, label: editedInput.input.label } as ICustomInput);

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
