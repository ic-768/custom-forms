import { v4 as uuid } from "uuid";

import { IFormComponent } from "../components/FormComponent";

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
  // Info from all the times this form has been filled out.
  submissions: any[];
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
  submissions: [],
};

export { emptyForm };
export type { IForm, IEditedComponent };
