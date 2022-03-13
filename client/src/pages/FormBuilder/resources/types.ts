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

export type { IForm, IEditedInput };
