import { useNavigate } from "react-router-dom";

import { ICustomInput } from "../../inputs/resources";
import AddInputForm from "..";

interface INewInputEditor {
  // add input to form
  addInput: (input: ICustomInput) => void;
  // currently edited input
  newInput: ICustomInput | null;
  // edit the new input
  setNewInput: (input: ICustomInput | null) => void;
}

const NewInputEditor = ({
  addInput,
  newInput,
  setNewInput,
}: INewInputEditor) => {
  const navigate = useNavigate();

  const onSave = () => {
    if (newInput) {
      addInput(newInput);
      setNewInput(null);
    }
  };

  const onCancel = () => navigate("/");

  return (
    <AddInputForm
      editedInput={newInput}
      editInput={setNewInput}
      onSave={onSave}
      onCancel={onCancel}
    />
  );
};

export default NewInputEditor;
