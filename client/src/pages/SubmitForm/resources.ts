import {
  FormInputProps,
  MultipleChoiceInputProps,
} from "components/inputs/inputComponents";
import { MultipleChoiceOption } from "components/inputs/inputComponents/MultipleChoiceInput";

/**
 * An answer to a single form question
 */
export interface FormAnswer<T extends FormInputProps = FormInputProps> {
  title?: string;
  type: T["type"];
  value: T extends MultipleChoiceInputProps ? MultipleChoiceOption[] : string;
}
