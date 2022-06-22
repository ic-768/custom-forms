import { DropdownInput } from "components/inputs/inputComponents";
import { ReactElement } from "react";
import { FormProps } from "resources/shared";

interface BackgroundPositionProps {
  editedStyles: FormProps["styles"] | null;
  setEditedStyles: (styles: FormProps["styles"] | null) => void;
}

const BackgroundPosition = ({
  editedStyles,
  setEditedStyles,
}: BackgroundPositionProps): ReactElement => {
  const onChangeBackgroundPosition = (o: string): void => {
    const backgroundPosition = o as FormProps["styles"]["backgroundPosition"];
    setEditedStyles({ ...editedStyles, backgroundPosition });
  };

  return (
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
  );
};

export default BackgroundPosition;
