import { ReactElement } from "react";
import { DropdownInput } from "components/inputs/inputComponents";
import { FormStyles } from "resources/shared";

interface BackgroundSizeProps {
  size?: FormStyles["backgroundSize"];
  editedStyles: FormStyles | null;
  setEditedStyles: (styles: FormStyles | null) => void;
}

const BackgroundSize = ({
  editedStyles,
  setEditedStyles,
}: BackgroundSizeProps): ReactElement => (
  <DropdownInput
    title="Background size"
    subtitle="Choose how to scale your form's background"
    value={editedStyles?.backgroundSize || "auto"}
    options={[
      { label: "cover", value: "cover" },
      { label: "contain", value: "contain" },
      { label: "auto", value: "auto" },
    ]}
    placeholder="Border type"
    onChange={(v): void => {
      setEditedStyles({
        ...editedStyles,
        backgroundSize: v as FormStyles["backgroundSize"],
      });
    }}
  />
);
export default BackgroundSize;
