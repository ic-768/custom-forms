import { v4 as uuid } from "uuid";

import { IFormComponent } from "../components/FormComponent";

/**
 * A single user form
 */
interface IForm {
  name: string;
  components: IFormComponent[];
  _id?: string;
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
};

export { emptyForm };
export type { IForm, IEditedComponent };
