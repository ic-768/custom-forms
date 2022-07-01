import { ReactElement } from "react";
import { FormProps, FormStyles } from "resources/shared";

import {
  SubmissionButtonStyle,
  BackgroundImage,
  BackgroundColor,
  BackgroundPosition,
  BackgroundSize,
} from "../FormStyleModifiers";

interface FormStyleModifiersListProps {
  editedStyles: FormStyles | null;
  setEditedStyles: (styles: FormStyles | null) => void;
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
      <>
        <BackgroundPosition
          editedStyles={editedStyles}
          setEditedStyles={setEditedStyles}
        />
        <BackgroundSize
          editedStyles={editedStyles}
          setEditedStyles={setEditedStyles}
        />
      </>
    )}
  </>
);
export default FormStyleModifiersList;
