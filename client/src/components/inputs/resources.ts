import {
  IDropdownInput,
  ITextInput,
  INumberInput,
  IDateInput,
  ITimeInput,
  IMultipleChoiceInput,
} from "./inputComponents/types";

export const inputTypes: string[] = [
  "Dropdown",
  "Text",
  "Number",
  "Date",
  "Time",
  "Multiple Choice",
];

/**
 * Type definition for input labels
 */
export type inputTypeLabel = typeof inputTypes[number];

/**
 *Type definition for custom input data  (used to render user-made inputs)
 */
export type ICustomInput =
  | IDropdownInput
  | ITextInput
  | INumberInput
  | IDateInput
  | ITimeInput
  | IMultipleChoiceInput;
