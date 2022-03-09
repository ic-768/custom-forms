import { useEffect, Dispatch, ChangeEvent } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faCloudUploadAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import InputEditor from "../../../components/InputEditor";
import TextInput from "../../../components/inputs/inputComponents/TextInput";
import CustomInput, {
  ICustomInput,
} from "../../../components/inputs/CustomInput";
import IForm from "../resources/IForm";
import { updateForm, postForm } from "../../../services/forms";

import "./FormEditor.scss";

/**
 * Component responsible for displaying a single form and editing controls
 */
const FormEditor = ({
  forms,
  editedForm,
  setEditedForm,
  editedInput,
  setEditedInput,
  token,
}: {
  forms: IForm[];
  editedForm: IForm;
  setEditedForm: (form: IForm) => void;
  editedInput: { input: ICustomInput; index: number } | null;

  setEditedInput: Dispatch<{
    input: ICustomInput;
    index: number;
  } | null>;
  token: string | null;
}) => {
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
    setEditedForm({
      ...editedForm,
      inputs: editedForm.inputs.concat({ type: "Text" }),
    });
  };

  const inputList = editedForm.inputs.map((input, i) => {
    // if rendering at editedInput's index, display editedInput
    const useEditedInput = i === editedInput?.index && editedInput.input;

    return (
      <div className="form-editor-input-container" key={i}>
        <CustomInput input={useEditedInput ? editedInput.input : input} />
        <button
          onClick={onSelectInput(i)}
          className="form-editor-input-edit-link"
        >
          <FontAwesomeIcon icon={faPencilAlt} />
        </button>
      </div>
    );
  });

  return (
    <div>
      <div className="form-editor">
        <TextInput
          label="Form Name"
          value={editedForm.name}
          onChange={onEditFormName}
        />
        {inputList}
      </div>
      <div className="form-editor-upload-form-button" onClick={onPublish}>
        <FontAwesomeIcon icon={faCloudUploadAlt} />
      </div>
      <Link to="/">Go Back</Link>
      {editedInput ? (
        // render control to edit existing input
        <InputEditor
          editedInput={editedInput}
          setEditedInput={setEditedInput}
          form={editedForm}
          setForm={setEditedForm}
        />
      ) : (
        // render button to add a new input
        <div onClick={onAddNewInput} className="form-builder-add-form-button">
          <FontAwesomeIcon icon={faPlus} />
        </div>
      )}
    </div>
  );
};

export default FormEditor;
