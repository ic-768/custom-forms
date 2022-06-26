import ColorInput from "components/inputs/inputComponents/ColorInput";
import { ReactElement } from "react";
import { ColorChangeHandler } from "react-color";
import { FormStyles } from "resources/shared";

interface BackgroundColorProps {
  editedStyles: FormStyles | null;
  setEditedStyles: (styles: FormStyles | null) => void;
}

const BackgroundColor = ({
  editedStyles,
  setEditedStyles,
}: BackgroundColorProps): ReactElement => {
  const onChangeBackgroundColor: ColorChangeHandler = (c) => {
    const backgroundColor = `rgba(${Object.values(c.rgb)})`;
    setEditedStyles({ ...editedStyles, backgroundColor });
  };

  return (
    <ColorInput
      title="Background color"
      subtitle="Set the color for the form's background"
      value={editedStyles?.backgroundColor}
      onChange={onChangeBackgroundColor}
    />
  );
};

export default BackgroundColor;
