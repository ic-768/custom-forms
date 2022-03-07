import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import IForm from "../../../pages/FormBuilder/resources/IForm";
import { ICustomInput } from "../../inputs/CustomInput";

import InputEditor from "..";

/**
 * Used to edit an existing input in a form
 */
interface IExistingInputEditor {
  // Input and its index within the form
  editedInput: { input: ICustomInput; index: number } | null;
  setEditedInput: (
    input: { input: ICustomInput; index: number } | null
  ) => void;
  // Currently edited form
  form: IForm;
  setForm: (form: IForm) => void;
}

const ExistingInputEditor = ({
  editedInput,
  setEditedInput,
  form,
  setForm,
}: IExistingInputEditor) => {
  const navigate = useNavigate();
  // get index from url
  const inputIndex = Number(useParams().index);
  const currentInput = [...form.inputs][inputIndex];
  // if form brand new, it won't have an id, so we give it 'new'
  const formId = `/${form._id || "new"}`;

  // Set edited input based on index
  useEffect(() => {
    setEditedInput({ input: currentInput, index: inputIndex });
  }, [currentInput, setEditedInput, inputIndex]);

  const updateForm = (input: ICustomInput | null) => {
    if (input) {
      setForm({
        ...form,
        inputs: form.inputs.map((i, idx) => (idx === inputIndex ? input : i)),
      });
    }
  };

  const onSave = () => {
    if (editedInput) {
      updateForm(editedInput.input);
      setEditedInput(null);
    }
    navigate(formId);
  };

  const onCancel = () => {
    navigate(formId);
    if (editedInput) {
      setEditedInput(null);
    }
  };

  return (
    <InputEditor
      editedInput={editedInput?.input || null}
      // update input, keep index as is
      editInput={(input) => {
        if (input) setEditedInput({ index: inputIndex, input });
      }}
      onSave={onSave}
      onCancel={onCancel}
    />
  );
};

export default ExistingInputEditor;
