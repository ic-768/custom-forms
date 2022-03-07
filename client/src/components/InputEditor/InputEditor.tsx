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
 * Used to edit an input form. Two cases are handled:
 *   1) input already exists on the form and is being edited
 *   2) input is brand new
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
  // Used to remove brand new input on cancel
}

const InputEditor = ({
  editedInput,
  setEditedInput,
  form,
  setForm,
}: IInputEditor) => {
  const params = useParams();
  const navigate = useNavigate();

  // get index from url. If NaN, we are adding a new input (so we use the last index)
  const index = Number(params.index);
  const inputIndex = !isNaN(index) ? index : form.inputs.length - 1;
  const currentInput = [...form.inputs][inputIndex];

  // if adding a new input
  const isNewInput = params.action === "add";

  // Set edited input based on index
  useEffect(() => {
    setEditedInput({ input: currentInput, index: inputIndex });
  }, [currentInput, setEditedInput, inputIndex]);

  useEffect(() => {
    // if creating new input, append
    if (isNewInput) {
      setForm({
        ...form,
        inputs: form.inputs.concat({ type: "Text" }),
      });
    }
  }, [form._id]);

  const updateForm = (input: ICustomInput | null) => {
    if (input) {
      setForm({
        ...form,
        inputs: form.inputs.map((i, idx) => (idx === inputIndex ? input : i)),
      });
    }
  };

  // if form is brand new, it won't have an id, so we give it 'new'
  const formId = `/${form._id || "new"}`;

  const onSave = () => {
    if (editedInput) {
      updateForm(editedInput.input);
      setEditedInput(null);
    }

    navigate(formId);
  };

  const onCancel = () => {
    if (editedInput) {
      setEditedInput(null);

      // remove input on cancel
      if (isNewInput) {
        setForm({
          ...form,
          inputs: form.inputs.filter(
            (_, idx) => idx !== form.inputs.length - 1
          ),
        });
      }
    }

    navigate(formId);
  };

  const editInput = (input: ICustomInput) => {
    if (input) setEditedInput({ index: inputIndex, input });
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
