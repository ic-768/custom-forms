import { useEffect, useState } from "react";
import { DropdownInput } from "../../../../../../components/inputs/inputComponents";
import { IForm } from "../../../../../../resources/shared";
import EditorPartial from "../../../../components/EditorPartial";

/*TODO On cancel => set editedForm to normal form **/
const FormStyleEditor = ({
  form,
  setForm,
  setEditingFormStyle,
}: {
  form: IForm;
  setForm: (form: IForm) => void;
  setEditingFormStyle: (bool: boolean) => void;
}) => {
  const [originalStyles, setOriginalStyles] = useState<IForm["styles"] | null>(
    null
  );

  /*onCancel can revert to these styles*/
  useEffect(() => {
    if (!originalStyles) setOriginalStyles(form.styles);
  }, [form, originalStyles]);

  const onChangeButtonStyle = (o: string) => {
    const buttonStyle = {
      buttonStyle: o as IForm["styles"]["buttonStyle"],
    };
    setForm({ ...form, styles: { ...form.styles, ...buttonStyle } });
  };

  return (
    <EditorPartial
      content={
        <>
          <DropdownInput
            title="Style for the submission button"
            selection={form.styles.buttonStyle || "Regular"}
            options={[
              { label: "Floating", value: "floating" },
              { label: "Regular", value: "regular" },
            ]}
            onChange={onChangeButtonStyle}
          />
        </>
      }
      onCancel={() => setEditingFormStyle(false)}
      onSave={() => null}
    />
  );
};
export default FormStyleEditor;
