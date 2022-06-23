import { ChangeEvent, useState, MouseEventHandler, ReactElement } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuid } from "uuid";
import {
  faCloudUploadAlt,
  faPlus,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

import { useWithLoader } from "store/hooks";
import Form from "components/Form";
import { emptyForm, EditedComponent, FormProps } from "resources/shared";
import { FormComponentProps } from "components/FormComponent";
import BackButton from "components/BackButton";
import { TextInput } from "components/inputs/inputComponents";
import EditableComponentList from "./components/EditableComponentList";
import ComponentEditor from "./components/ComponentEditor";
import SettingsButton from "./components/SettingsButton";
import FormStyleEditor from "./components/FormStyleEditor";
import useFormFromParam from "../../hooks/useFormFromParam";
import usePostForm from "../../hooks/usePostForm";
import useUpdateForm from "../../hooks/useUpdateForm";

import "./FormEditor.scss";

interface FormEditorProps {
  forms: FormProps[];
  editedForm: FormProps;
  setEditedForm: (form: FormProps) => void;
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
}: FormEditorProps): ReactElement => {
  // Draft component containing the currently edited input and its index in the form
  const [editedComponent, setEditedComponent] = useState<EditedComponent>(null);

  // Draft styles component for currently edited form styles
  const [editedStyles, setEditedStyles] = useState<FormProps["styles"] | null>(
    null
  );

  const navigate = useNavigate();
  const withLoader = useWithLoader();
  const postForm = usePostForm();
  const updateForm = useUpdateForm();
  useFormFromParam(forms, editedForm._id, useParams().id, setEditedForm);

  const addNewForm = async (form: FormProps): Promise<void> => {
    const newForm = await postForm(form, token);
    if (!(newForm instanceof Error)) navigate(`/edit/${newForm._id}`); // navigate away from '/new' to url with new id
  };

  // Post form to DB, and update redux store
  const onPublish = (): void => {
    withLoader(async () => {
      editedForm._id
        ? await updateForm(editedForm, token)
        : await addNewForm(editedForm);
    });
  };

  // When form name is being changed
  const onEditFormName = (e: ChangeEvent<HTMLInputElement>): void =>
    setEditedForm({ ...editedForm, name: e.target.value });

  // Add component to form and set editedComponent's index to shadow the new component for editing
  const onAddNewComponent: MouseEventHandler = (e) => {
    e.preventDefault();
    const component: FormComponentProps = {
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
  const onSelectComponent =
    (index: number): MouseEventHandler<Element> =>
    (e) => {
      e.preventDefault();
      setEditedComponent({
        component: editedForm.components[index],
        index,
      });
    };

  const onDeleteComponent =
    (index: number): MouseEventHandler<Element> =>
    (e) => {
      e.preventDefault();

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

  const onGoBack = (): void => {
    setEditedComponent(null);
    setEditedForm(emptyForm);
  };

  const onEditFormStyles = (): void => setEditedStyles(editedForm.styles);
  const onCancelStylesEdit = (): void => setEditedStyles(null);
  const onPreview = (): void => navigate(`/${editedForm._id}`);

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

      <Form
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
