import { ChangeEventHandler, ReactElement } from "react";
import { ColorChangeHandler } from "react-color";

import { useNotification } from "store/hooks";
import { IForm } from "resources/shared";
import { DropdownInput } from "components/inputs/inputComponents";
import InputContainer from "components/inputs/InputContainer";
import ColorInput from "components/inputs/inputComponents/ColorInput";
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
}): ReactElement => {
  const notify = useNotification();

  const onChangeButtonStyle = (o: string): void => {
    const buttonStyle = o as IForm["styles"]["buttonStyle"];
    setEditedStyles({ ...editedStyles, buttonStyle });
  };

  const onChangeBackgroundPosition = (o: string): void => {
    const backgroundPosition = o as IForm["styles"]["backgroundPosition"];
    setEditedStyles({ ...editedStyles, backgroundPosition });
  };

  const onChangeBackgroundColor: ColorChangeHandler = (c) => {
    const backgroundColor = `rgba(${Object.values(c.rgb)})`;
    setEditedStyles({ ...editedStyles, backgroundColor });
  };

  const onChangeBackgroundImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];

      if (file.size > 8388608) {
        notify({ message: "Image must be under 8MB", type: "error" }, 5000);
      } else {
        const reader = new FileReader();

        reader.onloadend = function (): void {
          setEditedStyles({
            ...editedStyles,
            backgroundImage: reader.result as string,
          });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const onClearBackgroundImage = (): void => {
    setEditedStyles({
      ...editedStyles,
      backgroundImage: undefined,
    });
  };

  const onSave = (): void => {
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
            value={editedStyles?.buttonStyle || "regular"}
            options={[
              { label: "floating", value: "floating" },
              { label: "regular", value: "regular" },
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

          <ColorInput
            title="Background color"
            subtitle="Set the color for the form's background"
            value={editedStyles?.backgroundColor}
            onChange={onChangeBackgroundColor}
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
              <button onClick={onClearBackgroundImage}>Clear</button>
            </>
          )}
          {editedStyles?.backgroundImage && (
            <DropdownInput
              title="Background position"
              value={editedStyles?.backgroundPosition || "center"}
              options={[
                { label: "center", value: "center" },
                { label: "left", value: "left" },
                { label: "right", value: "right" },
                { label: "top", value: "top" },
                { label: "bottom", value: "bottom" },
                { label: "bottom left", value: "bottom left" },
                { label: "bottom right", value: "bottom right" },
                { label: "top left", value: "top left" },
                { label: "top right", value: "top right" },
              ]}
              onChange={onChangeBackgroundPosition}
            />
          )}
        </>
      }
      onCancel={onCancel}
      onSave={onSave}
    />
  );
};
export default FormStyleEditor;
