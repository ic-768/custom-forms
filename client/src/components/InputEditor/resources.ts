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
 * Icon counterparts for inputTypes
 */
const inputIcons: IconDefinition[] = [
  faListUl,
  faPencilAlt,
  faCalculator,
  faCalendarAlt,
  faStopwatch,
  faEllipsisV,
];

export const inputTypes: string[] = [
  "Dropdown",
  "Text",
  "Number",
  "Date",
  "Time",
  "Multiple Choice",
];

/**
 * Object mapping each input to its corresponding icon
 */
export const inputLabelToIcon: {
  [key: typeof inputTypes[number]]: IconDefinition;
} = Object.fromEntries(
  inputTypes.map((_, i) => [inputTypes[i], inputIcons[i]])
);
