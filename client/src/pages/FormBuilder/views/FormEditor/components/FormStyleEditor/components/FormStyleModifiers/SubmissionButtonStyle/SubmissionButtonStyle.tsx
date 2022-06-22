import { DropdownInput } from "components/inputs/inputComponents";
import { ReactElement } from "react";
import { FormProps } from "resources/shared";

interface SubmissionButtonStyleProps {
  editedStyles: FormProps["styles"] | null;
  setEditedStyles: (styles: FormProps["styles"] | null) => void;
}

const SubmissionButtonStyle = ({
  editedStyles,
  setEditedStyles,
}: SubmissionButtonStyleProps): ReactElement => {
  const onChangeButtonStyle = (o: string): void => {
    const buttonStyle = o as FormProps["styles"]["buttonStyle"];
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
