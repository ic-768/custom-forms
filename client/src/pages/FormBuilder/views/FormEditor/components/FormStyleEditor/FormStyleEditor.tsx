import { ChangeEventHandler } from "react";

import { useNotification } from "store/hooks";
import { DropdownInput } from "components/inputs/inputComponents";
import InputContainer from "components/inputs/InputContainer";
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
  const notify = useNotification();
  const onChangeButtonStyle = (o: string) => {
    const buttonStyle = {
      buttonStyle: o as IForm["styles"]["buttonStyle"],
    };
    setEditedStyles({ ...editedStyles, ...buttonStyle });
  };

  const onChangeBackgroundPosition = (o: string) => {
    const backgroundPosition = {
      backgroundPosition: o as IForm["styles"]["backgroundPosition"],
    };
    setEditedStyles({ ...editedStyles, ...backgroundPosition });
  };

  const onChangeBackgroundImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];

      if (file.size > 8388608) {
        notify({ message: "Image can be up to 8MB", type: "error" }, 5000);
      } else {
        const url = window.URL.createObjectURL(file);

        setEditedStyles({
          ...editedStyles,
          backgroundImage: url,
        });
      }
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
            selection={editedStyles?.buttonStyle || "regular"}
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
          {editedStyles?.backgroundImage && (
            <>
              <img
                alt="chosen background"
                src={
                  (editedStyles?.backgroundImage ||
                    form.styles.backgroundImage) as string
                }
              />
              <button onClick={onClearBackgroundImage}>clear</button>
            </>
          )}
          {editedStyles?.backgroundImage && (
            <DropdownInput
              title="Background position"
              selection={editedStyles?.backgroundPosition || "center"}
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
