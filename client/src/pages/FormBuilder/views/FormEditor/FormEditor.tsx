import { useEffect, Dispatch, ChangeEvent } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuid } from "uuid";
import {
  faCloudUploadAlt,
  faPlus,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import {
  addForm,
  updateForm,
} from "../../../../store/features/forms/formsSlice";
import { useNotification, useWithLoader } from "../../../../store/hooks";
import TextInput from "../../../../components/inputs/inputComponents/TextInput";
import { asyncUpdateForm, asyncPostForm } from "../../../../services/forms";
import EditableInputList from "../../components/EditableInputList/EditableInputList";
import InputEditor from "../../components/InputEditor";
import { IForm, IEditedInput, emptyForm } from "../../resources/shared";

import "./FormEditor.scss";

interface IFormEditor {
  forms: IForm[];
  editedForm: IForm;
  setEditedForm: (form: IForm) => void;
  editedInput: IEditedInput;
  setEditedInput: Dispatch<IEditedInput>;
  token: string | null;
}

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
}: IFormEditor) => {
  const formIdFromUrl = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = useNotification();
  const withLoader = useWithLoader();

  // Set form based on url param
  useEffect(() => {
    if (forms) {
      const foundForm = forms.find((f) => f._id === formIdFromUrl);
      if (foundForm && foundForm._id !== editedForm._id) {
        setEditedForm(foundForm);
      }
    }
  }, [formIdFromUrl, forms, setEditedForm, editedForm._id]);

  const updateExistingForm = async (form: IForm) => {
    const updatedForm = await asyncUpdateForm(form, token!);
    dispatch(updateForm(updatedForm));
  };

  const addNewForm = async (form: IForm) => {
    const newForm = await asyncPostForm(form, token!);
    dispatch(addForm(newForm));
    navigate(`/${newForm._id}`); // navigate away from '/new'
  };

  // Post form to DB, and update redux store
  const onPublish = () => {
    withLoader(async () => {
      if (token) {
        if (!editedForm.name) {
          notify(
            { type: "error", message: "Please provide a name for your form" },
            3000
          );
        } else {
          try {
            if (editedForm._id) {
              await updateExistingForm(editedForm);
            } else {
              await addNewForm(editedForm);
            }
            notify({ type: "success", message: "Form has been saved!" }, 3000);
          } catch (e) {
            notify({ type: "error", message: "Something went wrong" }, 3000);
          }
        }
      }
    });
  };

  // When form name is being changed
  const onEditFormName = (e: ChangeEvent<HTMLInputElement>) =>
    setEditedForm({ ...editedForm, name: e.target.value });

  // Callback to start editing an input
  const onSelectInput = (index: number) => () => {
    setEditedInput({
      input: editedForm.inputs[index],
      index: index,
    });
  };

  // Add input to form and set editedInput's index to shadow the new input for editing
  const onAddNewInput = () => {
    const input = {
      type: "Text",
      label: "",
      id: uuid(),
    } as const;

    setEditedForm({
      ...editedForm,
      inputs: editedForm.inputs.concat(input),
    });

    setEditedInput({
      input,
      index: editedForm.inputs.length,
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

  const onGoBack = () => setEditedForm(emptyForm);

  return (
    <div className="form-editor-container">
      <Link
        className="form-editor-input-go-back-link"
        to="/"
        onClick={onGoBack}
      >
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
