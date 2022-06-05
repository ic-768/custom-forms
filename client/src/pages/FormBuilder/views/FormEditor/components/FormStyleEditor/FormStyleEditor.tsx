import { DropdownInput } from "../../../../../../components/inputs/inputComponents";
import { IForm } from "../../../../../../resources/shared";
import EditorPartial from "../../../../components/EditorPartial";

const FormStyleEditor = ({
  form,
  setForm,
  editedStyles,
  setEditedStyles,
  onCancel,
}: {
  editedStyles: IForm["styles"] | null;
  setEditedStyles: (styles: IForm["styles"] | null) => void;
  form: IForm;
  setForm: (form: IForm) => void;
  onCancel: () => void;
}) => {
  const onChangeButtonStyle = (o: string) => {
    const buttonStyle = {
      buttonStyle: o as IForm["styles"]["buttonStyle"],
    };
    setEditedStyles({ ...form.styles, ...buttonStyle });
  };

  const onSave = () => {
    if (editedStyles) {
      setForm({ ...form, styles: editedStyles });
      setEditedStyles(null);
    }
  };

  return (
    <EditorPartial
      content={
        <>
          <DropdownInput
            title="Style for the submission button"
            selection={
              editedStyles?.buttonStyle || form.styles.buttonStyle || "Regular"
            }
            options={[
              { label: "Floating", value: "floating" },
              { label: "Regular", value: "regular" },
            ]}
            onChange={onChangeButtonStyle}
          />
        </>
      }
      onCancel={onCancel}
      onSave={onSave}
    />
  );
};
export default FormStyleEditor;
