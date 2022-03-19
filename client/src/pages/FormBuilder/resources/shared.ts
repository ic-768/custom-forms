import { ICustomInput } from "../../../components/inputs/CustomInput";

/**
 * A single user form
 */
interface IForm {
  name: string;
  inputs: ICustomInput[];
  _id?: string;
}

/**
 * Input being edited in FormBuilder, also contains its index in the form inputs
 */
type IEditedInput = {
  input: ICustomInput;
  index: number;
} | null;

/**
 * Used when instantiating a new form
 */

const emptyForm: IForm = {
  name: "",
  inputs: [{ type: "Text" }],
};

export { emptyForm };
export type { IForm, IEditedInput };
