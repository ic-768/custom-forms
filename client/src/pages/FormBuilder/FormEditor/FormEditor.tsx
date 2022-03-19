import { useEffect, Dispatch, ChangeEvent } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudUploadAlt,
  faPlus,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import TextInput from "../../../components/inputs/inputComponents/TextInput";
import { updateForm, postForm } from "../../../services/forms";
import EditableInputList from "../EditableInputList/EditableInputList";
import InputEditor from "../../../components/InputEditor";
import { IForm, IEditedInput } from "../resources/shared";

import "./FormEditor.scss";

/**
 * Component responsible for displaying a single form and editing controls
 */
interface IFormEditor {
  forms: IForm[];
  editedForm: IForm;
  setEditedForm: (form: IForm) => void;
  editedInput: IEditedInput;
  setEditedInput: Dispatch<IEditedInput>;
  token: string | null;
}

const FormEditor = ({
  forms,
  editedForm,
  setEditedForm,
  editedInput,
  setEditedInput,
  token,
}: IFormEditor) => {
  const formIdFromUrl = useParams().id;

  // Set form based on url param
  useEffect(() => {
    if (forms) {
      const foundForm = forms.find((f) => f._id === formIdFromUrl);
      if (foundForm && foundForm._id !== editedForm._id) {
        setEditedForm(foundForm);
      }
    }
  }, [formIdFromUrl, editedForm._id, forms, setEditedForm]);

  // Saving form - if it has an ID it's already in DB
  const onPublish = () => {
    if (token)
      if (editedForm._id) {
        updateForm(editedForm, token);
      } else {
        postForm(editedForm, token);
      }
  };

  // When Form name is being changed
  const onEditFormName = (e: ChangeEvent<HTMLInputElement>) =>
    setEditedForm({ ...editedForm, name: e.target.value });

  // Callback to start editing an input
  const onSelectInput = (index: number) => () => {
    setEditedInput({
      input: editedForm.inputs[index],
      index: index,
    });
  };

  // When adding a new input to the form
  const onAddNewInput = () => {
    const input = {
      type: "Text",
      label: "",
    } as const;

    setEditedInput({
      input,
      index: editedForm.inputs.length,
    });

    setEditedForm({
      ...editedForm,
      inputs: editedForm.inputs.concat(input),
    });
  };

  const onDeleteInput = (index: number) => () => {
    const remainingInputs = editedForm.inputs.filter(
      (_i, idx) => idx !== index
    );

    setEditedForm({
      ...editedForm,
      inputs: remainingInputs,
    });

    if (editedInput) {
      setEditedInput(null);
    }
  };

  return (
    <div className="form-editor-container">
      <Link className="form-editor-input-go-back-link" to="/">
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <div className="form-editor">
        <TextInput
          className="form-editor-form-title"
          placeholder="Form name"
          value={editedForm.name}
          onChange={onEditFormName}
        />
        <EditableInputList
          inputs={editedForm.inputs}
          editedInput={editedInput}
          setEditedInput={setEditedInput}
          onSelectInput={onSelectInput}
          onDeleteInput={onDeleteInput}
          editedForm={editedForm}
          setEditedForm={setEditedForm}
        />
        {editedInput ? (
          <InputEditor
            editedInput={editedInput}
            setEditedInput={setEditedInput}
            form={editedForm}
            setForm={setEditedForm}
          />
        ) : (
          // render button to add a new input
          <div onClick={onAddNewInput} className="form-editor-add-input-button">
            <FontAwesomeIcon icon={faPlus} />
          </div>
        )}
      </div>

      <div className="form-editor-upload-form-button" onClick={onPublish}>
        <FontAwesomeIcon icon={faCloudUploadAlt} />
      </div>
    </div>
  );
};

export default FormEditor;
