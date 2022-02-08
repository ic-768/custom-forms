import {
  faPencilAlt,
  faCalculator,
  faListUl,
  faCalendarAlt,
  faStopwatch,
  IconDefinition,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";

/**
 * List of all input types
 */
export const inputTypes: string[] = [
  "Dropdown",
  "Text",
  "Number",
  "Date",
  "Time",
  "Multiple Choice",
];

/**
 * List of corresponding icons for input types
 */
export const inputIcons: IconDefinition[] = [
  faListUl,
  faPencilAlt,
  faCalculator,
  faCalendarAlt,
  faStopwatch,
  faEllipsisV,
];

/**
 *Type definition for custom inputs
 */
export interface ICustomInput {
  inputType: typeof inputTypes[number];
  styles: object;
}
