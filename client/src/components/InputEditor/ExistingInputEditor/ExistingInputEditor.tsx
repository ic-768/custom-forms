import { useNavigate, useParams } from "react-router-dom";

import IForm from "../../../resources/IForm";
import { ICustomInput } from "../../inputs/resources";

import AddInputForm from "..";

interface IExistingInputEditor {
  form: IForm;
  setForm: (form: IForm) => void;
}

const ExistingInputEditor = ({ form, setForm }: IExistingInputEditor) => {
  const navigate = useNavigate();
  const inputIndex = Number(useParams().index);
  const editedInput = form.inputs[inputIndex];

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
  };

  const onCancel = () => navigate("/");

  return (
    <AddInputForm
      editedInput={editedInput}
      editInput={editInput}
      onSave={onSave}
      onCancel={onCancel}
    />
  );
};

export default ExistingInputEditor;
