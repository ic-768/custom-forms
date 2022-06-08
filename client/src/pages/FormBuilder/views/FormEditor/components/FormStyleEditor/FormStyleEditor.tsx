import { DropdownInput } from "components/inputs/inputComponents";
import InputContainer from "components/inputs/InputContainer";
import { ChangeEventHandler } from "react";

import { IForm } from "resources/shared";
import EditorPartial from "../EditorPartial";

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
    setEditedStyles({ ...editedStyles, ...buttonStyle });
  };

  const onChangeBackgroundImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = function () {
        setEditedStyles({
          ...editedStyles,
          backgroundImage: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const onClearBackgroundImage = () => {
    setEditedStyles({
      ...editedStyles,
      backgroundImage: undefined,
    });
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
            title="Submission button style"
            selection={editedStyles?.buttonStyle || "Regular"}
            options={[
              { label: "Floating", value: "floating" },
              { label: "Regular", value: "regular" },
            ]}
            onChange={onChangeButtonStyle}
          />
          {/*File select input*/}
          <InputContainer
            component={
              <>
                <span>Background image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onChangeBackgroundImage}
                />
              </>
            }
          />
          {editedStyles?.backgroundImage && (
            <>
              <img
                alt="chosen background"
                src={
                  (editedStyles?.backgroundImage ||
                    form.styles.backgroundImage) as string
                }
              />
              {/*...editedStyles*/}
              <button onClick={onClearBackgroundImage}>clear</button>
            </>
          )}
        </>
      }
      onCancel={onCancel}
      onSave={onSave}
    />
  );
};
export default FormStyleEditor;
