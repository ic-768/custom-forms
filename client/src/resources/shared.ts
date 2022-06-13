import { v4 as uuid } from "uuid";

import { IFormInput } from "components/inputs/inputComponents";
import { IFormComponent } from "components/FormComponent";
import {
  IMultipleChoiceInput,
  IMultipleChoiceOption,
} from "components/inputs/inputComponents/MultipleChoiceInput";

type horizontalPosition = "left" | "right";
type verticalPosition = "top" | "bottom";
type completePosition = `${verticalPosition} ${horizontalPosition}` | "center";

interface IFormStyles {
  backgroundImage?: string;
  backgroundPosition?: horizontalPosition | verticalPosition | completePosition;
  backgroundColor?: string;
  buttonStyle?: "floating" | "regular";
}

/**
 * An answer to a single form question
 */
export interface IFormAnswer<T extends IFormInput = IFormInput> {
  title?: string;
  type: T["type"];
  value: T extends IMultipleChoiceInput ? IMultipleChoiceOption[] : string;
}

/**
 * A single form submission (answers to many questions)
 */
export type IFormSubmission = IFormAnswer[];

/**
 * A single user form
 */
interface IForm {
  // Form name
  name: string;
  // ID given assigned from backend when first created
  _id?: string;
  // The components that make up the form
  components: IFormComponent[];
  // general form styles like background color/image, submit button style, etc.
  styles: IFormStyles;
  // Info from all the times this form has been filled out.
  submissions: IFormSubmission[];
}

/**
 * Component being edited in FormBuilder, also contains its index in the form inputs
 */
type IEditedComponent = {
  component: IFormComponent;
  index: number;
} | null;

/**
 * Used to instantiate a new form
 */
const emptyForm: IForm = {
  name: "",
  components: [{ type: "Text", id: uuid() }],
  styles: {},
  submissions: [],
};

export { emptyForm };
export type { IForm, IEditedComponent };
