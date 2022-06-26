import { FormComponentProps } from "components/FormComponent";
import { FormAnswer } from "pages/SubmitForm/resources";

type HorizontalPosition = "left" | "right";
type VerticalPosition = "top" | "bottom";
type CompletePosition = `${VerticalPosition} ${HorizontalPosition}` | "center";

export interface FormStyles {
  backgroundImage?: string;
  backgroundPosition?: HorizontalPosition | VerticalPosition | CompletePosition;
  backgroundColor?: string;
  buttonStyle?: "floating" | "regular";
}

/**
 * A single form submission (answers to many questions)
 */
export type FormSubmission = FormAnswer[];

/**
 * A single user form
 */
export interface FormProps {
  // Form name
  name: string;
  // DProps given assigned from backend when first created
  _id?: string;
  // The components that make up the form
  components: FormComponentProps[];
  // general form styles like background color/image, submit button style, etc.
  styles: FormStyles;
  // Info from all the times this form has been filled out.
  submissions: FormSubmission[];
}

/**
 * Check if value is a valid form
 */
export const isForm = (form: unknown): form is FormProps => {
  if (typeof form !== "object" || !form) return false;

  return "name" in form && "components" in form && "submissions" in form;
};

/**
 * Check if array of valid forms
 */
export const areForms = (forms: unknown): forms is FormProps[] => {
  if (!Array.isArray(forms) || !forms) return false;

  return forms.every((f) => isForm(f));
};
