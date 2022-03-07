import { useNavigate, useParams } from "react-router-dom";

import IForm from "../../../pages/FormBuilder/resources/IForm";
import { ICustomInput } from "../../inputs/CustomInput";

import InputEditor from "..";

interface IExistingInputEditor {
  form: IForm;
  setForm: (form: IForm) => void;
}

const ExistingInputEditor = ({ form, setForm }: IExistingInputEditor) => {
  const navigate = useNavigate();
  const inputIndex = Number(useParams().index);
  const editedInput = form.inputs[inputIndex];
  const formId = `/${form._id || "new"}`;

  const editInput = (input: ICustomInput | null) => {
    if (input) {
      setForm({
        ...form,
        inputs: form.inputs.map((i, idx) => (idx === inputIndex ? input : i)),
      });
    }
  };

  const onSave = () => {
    if (editedInput) {
      editInput(editedInput);
    }
    navigate(formId);
  };

  const onCancel = () => navigate(formId);

  return (
    <InputEditor
      editedInput={editedInput}
      editInput={editInput}
      onSave={onSave}
      onCancel={onCancel}
    />
  );
};

export default ExistingInputEditor;
