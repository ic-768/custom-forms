import {
  faPencilAlt,
  faCalculator,
  faListUl,
  faCalendarAlt,
  faStopwatch,
  IconDefinition,
  faEllipsisV,
  faSlidersH,
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
  faSlidersH,
];

export const inputTypes = [
  "Dropdown",
  "Text",
  "Number",
  "Date",
  "Time",
  "Multiple Choice",
  "Range",
] as const;

/**
 * Object mapping each input to its corresponding icon
 */
export const inputLabelToIcon = Object.fromEntries(
  inputTypes.map((_, i) => [inputTypes[i], inputIcons[i]])
);
