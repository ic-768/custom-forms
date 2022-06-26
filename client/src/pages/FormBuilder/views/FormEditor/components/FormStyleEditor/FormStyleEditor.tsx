import { ReactElement } from "react";

import { FormProps, FormStyles } from "resources/shared";
import EditorPartial from "../EditorPartial";
import FormStyleModifiersList from "./components/FormStyleModifiersList";

interface FormStyleEditorProps {
  editedStyles: FormStyles | null;
  setEditedStyles: (styles: FormStyles | null) => void;
  form: FormProps;
  setForm: (form: FormProps) => void;
  onCancel: () => void;
}

const FormStyleEditor = ({
  form,
  setForm,
  editedStyles,
  setEditedStyles,
  onCancel,
}: FormStyleEditorProps): ReactElement => {
  const onSave = (): void => {
    if (editedStyles) {
      setForm({ ...form, styles: editedStyles });
      setEditedStyles(null);
    }
  };

  return (
    <EditorPartial
      onCancel={onCancel}
      onSave={onSave}
      content={
        <FormStyleModifiersList
          form={form}
          editedStyles={editedStyles}
          setEditedStyles={setEditedStyles}
        />
      }
    />
  );
};

export default FormStyleEditor;
