import InputContainer from "components/inputs/InputContainer";
import { ChangeEventHandler, ReactElement } from "react";
import { FormProps } from "resources/shared";
import { useNotification } from "store/hooks";

interface BackgroundImageProps {
  formBackground: FormProps["styles"]["backgroundImage"];
  editedStyles: FormProps["styles"] | null;
  setEditedStyles: (styles: FormProps["styles"] | null) => void;
}

const BackgroundImage = ({
  formBackground,
  editedStyles,
  setEditedStyles,
}: BackgroundImageProps): ReactElement => {
  const notify = useNotification();

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

  return (
    <InputContainer
      component={
        <>
          <span>Background image</span>
          <input
            type="file"
            accept="image/*"
            onChange={onChangeBackgroundImage}
          />
          {editedStyles?.backgroundImage && (
            <>
              <img
                alt="chosen background"
                src={editedStyles?.backgroundImage || formBackground}
              />
              <button onClick={onClearBackgroundImage}>Clear</button>
            </>
          )}
        </>
      }
    />
  );
};

export default BackgroundImage;
