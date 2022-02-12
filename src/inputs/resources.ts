import {
  faPencilAlt,
  faCalculator,
  faListUl,
  faCalendarAlt,
  faStopwatch,
  IconDefinition,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";

export const inputTypes: string[] = [
  "Dropdown",
  "Text",
  "Number",
  "Date",
  "Time",
  "Multiple Choice",
];

const inputIcons: IconDefinition[] = [
  faListUl,
  faPencilAlt,
  faCalculator,
  faCalendarAlt,
  faStopwatch,
  faEllipsisV,
];

/**
 * Object mapping each input to its corresponding icon
 */
export const inputLabelToIcon: { [key: string]: IconDefinition } =
  Object.fromEntries(inputTypes.map((_, i) => [inputTypes[i], inputIcons[i]]));

/**
 * Type definition for input labels
 */
export type inputTypeLabel = typeof inputTypes[number];

/**
 *Type definition for custom input data  (used to render user-made inputs)
 */
export interface ICustomInput {
  inputType: typeof inputTypes[number];
  styles: object;
}
