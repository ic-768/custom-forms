import { DropdownInput } from "components/inputs/inputComponents";
import { ReactElement } from "react";
import { FormStyles } from "resources/shared";

interface SubmissionButtonStyleProps {
  editedStyles: FormStyles | null;
  setEditedStyles: (styles: FormStyles | null) => void;
}

const SubmissionButtonStyle = ({
  editedStyles,
  setEditedStyles,
}: SubmissionButtonStyleProps): ReactElement => {
  const onChangeButtonStyle = (o: string): void => {
    const buttonStyle = o as FormStyles["buttonStyle"];
    setEditedStyles({ ...editedStyles, buttonStyle });
  };

  return (
    <DropdownInput
      title="Submission button style"
      value={editedStyles?.buttonStyle || "regular"}
      options={[
        { label: "floating", value: "floating" },
        { label: "regular", value: "regular" },
      ]}
      onChange={onChangeButtonStyle}
    />
  );
};

export default SubmissionButtonStyle;
