import { v4 as uuid } from "uuid";

import { FormInputProps } from "components/inputs/inputComponents";
import { FormComponentProps } from "components/FormComponent";
import {
  MultipleChoiceInputProps,
  MultipleChoiceOption,
} from "components/inputs/inputComponents/MultipleChoiceInput";

type HorizontalPosition = "left" | "right";
type VerticalPosition = "top" | "bottom";
type CompletePosition = `${VerticalPosition} ${HorizontalPosition}` | "center";

interface FormStyles {
  backgroundImage?: string;
  backgroundPosition?: HorizontalPosition | VerticalPosition | CompletePosition;
  backgroundColor?: string;
  buttonStyle?: "floating" | "regular";
}

/**
 * An answer to a single form question
 */
export interface FormAnswer<T extends FormInputProps = FormInputProps> {
  title?: string;
  type: T["type"];
  value: T extends MultipleChoiceInputProps ? MultipleChoiceOption[] : string;
}

/**
 * A single form submission (answers to many questions)
 */
export type FormSubmission = FormAnswer[];

/**
 * A single user form
 */
interface FormProps {
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

export const isForm = (form: unknown): form is FormProps => {
  if (typeof form !== "object" || !form) return false;

  return "name" in form && "components" in form && "submissions" in form;
};

/**
 * Component being edited in FormBuilder, also contains its index in the form inputs
 */
type EditedComponent = {
  component: FormComponentProps;
  index: number;
} | null;

/**
 * Used to instantiate a new form
 */
const emptyForm: FormProps = {
  name: "",
  components: [{ type: "Text", id: uuid() }],
  styles: {},
  submissions: [],
};

export { emptyForm };
export type { FormProps, EditedComponent };
