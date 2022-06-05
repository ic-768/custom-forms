import { useEffect, ChangeEvent, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuid } from "uuid";
import {
  faCloudUploadAlt,
  faPlus,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

import {
  addForm,
  updateForm,
} from "../../../../store/features/forms/formsSlice";
import { useNotification, useWithLoader } from "../../../../store/hooks";
import { asyncUpdateForm, asyncPostForm } from "../../../../services/forms";
import FormPage from "../../../../components/FormPage";
import {
  emptyForm,
  IEditedComponent,
  IForm,
} from "../../../../resources/shared";
import { IFormComponent } from "../../../../components/FormComponent";
import BackButton from "../../../../components/BackButton";
import { TextInput } from "../../../../components/inputs/inputComponents";
import EditableComponentList from "./components/EditableComponentList";
import ComponentEditor from "./components/ComponentEditor";
import SettingsButton from "./components/SettingsButton";
import FormStyleEditor from "./components/FormStyleEditor";

import "./FormEditor.scss";

interface IFormEditor {
  forms: IForm[];
  editedForm: IForm;
  setEditedForm: (form: IForm) => void;
  token: string | null;
}

/**
 * Component responsible for displaying a single form and editing controls
 */
const FormEditor = ({
  forms,
  editedForm,
  setEditedForm,
  token,
}: IFormEditor) => {
  // Draft component containing the currently edited input and its index in the form
  const [editedComponent, setEditedComponent] =
    useState<IEditedComponent>(null);

  // Draft styles component for currently edited form styles
  const [editedStyles, setEditedStyles] = useState<IForm["styles"] | null>(
    null
  );

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
    navigate(`/edit/${newForm._id}`); // navigate away from '/new' to url with new id
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
            editedForm._id
              ? await updateExistingForm(editedForm)
              : await addNewForm(editedForm);

            notify({ type: "success", message: "Form has been saved!" }, 5000);
          } catch (e) {
            notify({ type: "error", message: "Something went wrong" }, 5000);
          }
        }
      }
    });
  };

  // When form name is being changed
  const onEditFormName = (e: ChangeEvent<HTMLInputElement>) =>
    setEditedForm({ ...editedForm, name: e.target.value });

  // Add component to form and set editedComponent's index to shadow the new component for editing
  const onAddNewComponent = () => {
    const component: IFormComponent = {
      type: "Text",
      id: uuid(),
    };

    setEditedForm({
      ...editedForm,
      components: editedForm.components.concat(component),
    });

    setEditedComponent({
      component,
      index: editedForm.components.length,
    });
  };

  // Callback to start editing a component
  const onSelectComponent = (index: number) => () => {
    setEditedComponent({
      component: editedForm.components[index],
      index,
    });
  };

  const onDeleteComponent = (index: number) => () => {
    const remainingComponents = editedForm.components.filter(
      (_i, idx) => idx !== index
    );

    setEditedForm({
      ...editedForm,
      components: remainingComponents,
    });

    if (editedComponent) {
      setEditedComponent(null);
    }
  };

  const onGoBack = () => {
    setEditedComponent(null);
    setEditedForm(emptyForm);
  };

  const onEditFormStyles = () => setEditedStyles(editedForm.styles);
  const onCancelStylesEdit = () => setEditedStyles(null);

  const onPreview = () => navigate(`/${editedForm._id}`);

  const isEditing = !!(editedComponent || editedStyles);

  return (
    <>
      <BackButton onClick={onGoBack} />
      {!isEditing && <SettingsButton onClick={onEditFormStyles} />}
      {editedStyles && (
        <FormStyleEditor
          form={editedForm}
          setForm={setEditedForm}
          editedStyles={editedStyles}
          setEditedStyles={setEditedStyles}
          onCancel={onCancelStylesEdit}
        />
      )}
      {editedComponent && (
        <ComponentEditor
          editedComponent={editedComponent}
          setEditedComponent={setEditedComponent}
          form={editedForm}
          setForm={setEditedForm}
        />
      )}

      <FormPage
        styles={editedStyles || editedForm.styles}
        content={
          <>
            <TextInput
              className="form-editor-form-title"
              placeholder="Form name"
              value={editedForm.name}
              onChange={onEditFormName}
            />
            <EditableComponentList
              isEditing={isEditing}
              components={editedForm.components}
              editedComponent={editedComponent}
              onSelectComponent={onSelectComponent}
              onDeleteComponent={onDeleteComponent}
              editedForm={editedForm}
              setEditedForm={setEditedForm}
            />
            {!isEditing && (
              // button to add a new component
              <button
                onClick={onAddNewComponent}
                className="form-editor-add-component-button"
              >
                <FontAwesomeIcon
                  onClick={onAddNewComponent}
                  title="Add a form component"
                  icon={faPlus}
                />
              </button>
            )}
          </>
        }
      />

      <div className="form-editor-form-buttons">
        <div className="form-editor-upload-form-button" onClick={onPublish}>
          <FontAwesomeIcon
            className="form-editor-button-icon"
            title="Save"
            icon={faCloudUploadAlt}
          />
        </div>
        <div className="form-editor-preview-form-button" onClick={onPreview}>
          <FontAwesomeIcon
            className="form-editor-button-icon"
            title="Preview"
            icon={faEye}
          />
        </div>
      </div>
    </>
  );
};

export default FormEditor;
