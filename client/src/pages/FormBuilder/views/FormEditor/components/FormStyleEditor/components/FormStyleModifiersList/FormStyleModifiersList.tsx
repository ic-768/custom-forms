import { ReactElement } from "react";
import { FormProps } from "resources/shared";

import {
  SubmissionButtonStyle,
  BackgroundImage,
  BackgroundColor,
  BackgroundPosition,
} from "../FormStyleModifiers";

interface FormStyleModifiersListProps {
  editedStyles: FormProps["styles"] | null;
  setEditedStyles: (styles: FormProps["styles"] | null) => void;
  form: FormProps;
}

const FormStyleModifiersList = ({
  form,
  editedStyles,
  setEditedStyles,
}: FormStyleModifiersListProps): ReactElement => (
  <>
    <SubmissionButtonStyle
      editedStyles={editedStyles}
      setEditedStyles={setEditedStyles}
    />
    <BackgroundImage
      formBackground={form?.styles.backgroundImage}
      editedStyles={editedStyles}
      setEditedStyles={setEditedStyles}
    />

    <BackgroundColor
      editedStyles={editedStyles}
      setEditedStyles={setEditedStyles}
    />

    {editedStyles?.backgroundImage && (
      <BackgroundPosition
        editedStyles={editedStyles}
        setEditedStyles={setEditedStyles}
      />
    )}
  </>
);
export default FormStyleModifiersList;
