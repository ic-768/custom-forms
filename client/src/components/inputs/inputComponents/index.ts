import DateInput, { IDateInput } from "./DateInput";
import DropdownInput, { IDropdownInput } from "./DropdownInput";
import MultipleChoiceInput, {
  IMultipleChoiceInput,
} from "./MultipleChoiceInput";
import NumberInput, { INumberInput } from "./NumberInput";
import TextInput, { ITextInput } from "./TextInput";
import TimeInput, { ITimeInput } from "./TimeInput";
import RangeInput, { IRangeInput } from "./RangeInput";

export type IFormInput =
  | IDropdownInput
  | ITextInput
  | INumberInput
  | IDateInput
  | ITimeInput
  | IMultipleChoiceInput
  | IRangeInput;

export {
  DateInput,
  DropdownInput,
  MultipleChoiceInput,
  NumberInput,
  TextInput,
  TimeInput,
  RangeInput,
};

export type {
  IDateInput,
  IDropdownInput,
  IMultipleChoiceInput,
  INumberInput,
  ITextInput,
  ITimeInput,
  IRangeInput,
};
