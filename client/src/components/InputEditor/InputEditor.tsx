import { useNavigate } from "react-router-dom";

import { getInputIcon } from "./helpers";
import InputModifiersList from "./InputModifiersList";
import DropdownInput from "../inputs/inputComponents/DropdownInput";
import { inputsForDropdown } from "./helpers";
import IForm from "../../pages/FormBuilder/resources/IForm";
import { ICustomInput } from "../inputs/CustomInput";

import "./InputEditor.scss";

/**
 * Used to customise a a form input.
 */
interface IInputEditor {
  // Input and its index within the form
  editedInput: { input: ICustomInput; index: number };
  setEditedInput: (
    input: { input: ICustomInput; index: number } | null
  ) => void;
  // Currently edited form
  form: IForm;
  setForm: (form: IForm) => void;
}

const InputEditor = ({
  editedInput,
  setEditedInput,
  form,
  setForm,
}: IInputEditor) => {
  const navigate = useNavigate();

  // replace form's input with newly edited one
  const updateForm = (input: ICustomInput) => {
    setForm({
      ...form,
      inputs: form.inputs.map((i, idx) =>
        idx === editedInput.index ? input : i
      ),
    });
  };

  const goBack = () => navigate(`/${form._id || "new"}`);

  const onSave = () => {
    updateForm(editedInput.input);
    setEditedInput(null);
    goBack();
  };

  const onCancel = () => {
    setEditedInput(null);
    goBack();
  };

  // edit input - keep index
  const editInput = (input: ICustomInput) => {
    setEditedInput({ ...editedInput, input });
  };

  // set edited input's type
  const onInputTypeSelect = (t: string) =>
    editInput({ type: t } as ICustomInput);

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
