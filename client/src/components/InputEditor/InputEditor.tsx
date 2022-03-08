import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  editedInput: { input: ICustomInput; index: number } | null;
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
  const params = useParams();
  const navigate = useNavigate();

  const index = Number(params.index); // input's index in the form
  const currentInput = [...form.inputs][index];

  // Set edited input for user to customise it
  useEffect(() => {
    setEditedInput({ input: currentInput, index });
  }, [index, currentInput, setEditedInput]);

  const updateForm = (input: ICustomInput) => {
    setForm({
      ...form,
      inputs: form.inputs.map((i, idx) => (idx === index ? input : i)),
    });
  };

  const goBack = () => navigate(`/${form._id || "new"}`);
  const onSave = () => {
    if (editedInput?.input) {
      updateForm(editedInput.input);
      setEditedInput(null);
    }
    goBack();
  };

  const onCancel = () => {
    if (editedInput) {
      setEditedInput(null);
    }
    goBack();
  };

  const editInput = (input: ICustomInput) => {
    if (input) setEditedInput({ index, input });
  };

  if (!editedInput?.input) return null;
  return (
    <div className="input-editor">
      <div className="input-editor-options-container">
        <DropdownInput
          label="Choose an input type"
          placeholder="-- Choose an input type --"
          options={inputsForDropdown}
          onChange={(t) => editInput({ type: t } as ICustomInput)}
          selection={editedInput?.input.type || null}
          selectionIcon={
            editedInput?.input.type &&
            getInputIcon(editedInput.input.type || null)
          }
        />
        {editedInput && (
          <InputModifiersList
            input={editedInput?.input}
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
