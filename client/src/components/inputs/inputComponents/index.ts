import DateInput, { DateInputProps } from "./DateInput";
import DropdownInput, { DropdownInputProps } from "./DropdownInput";
import MultipleChoiceInput, {
  MultipleChoiceInputProps,
} from "./MultipleChoiceInput";
import NumberInput, { NumberInputProps } from "./NumberInput";
import TextInput, { TextInputProps } from "./TextInput";
import TimeInput, { TimeInputProps } from "./TimeInput";
import RangeInput, { RangeInputProps } from "./RangeInput";
import MultipleEntryInput from "./MultipleEntryInput";

export type FormInputProps =
  | DropdownInputProps
  | TextInputProps
  | NumberInputProps
  | DateInputProps
  | TimeInputProps
  | MultipleChoiceInputProps
  | RangeInputProps;

export {
  DateInput,
  DropdownInput,
  MultipleChoiceInput,
  NumberInput,
  TextInput,
  TimeInput,
  RangeInput,
  MultipleEntryInput,
};

export type {
  DateInputProps,
  DropdownInputProps,
  MultipleChoiceInputProps,
  NumberInputProps,
  TextInputProps,
  TimeInputProps,
  RangeInputProps,
};
