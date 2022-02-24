import {
  type IDropdownInput,
  type ITextInput,
  type INumberInput,
  type IDateInput,
  type ITimeInput,
  type IMultipleChoiceInput,
} from "../inputComponents/types";

export interface IInputStyles {
  borderRadius?: number;
}

export type IInputProps =
  | IDropdownInput
  | ITextInput
  | INumberInput
  | IDateInput
  | ITimeInput
  | IMultipleChoiceInput;
