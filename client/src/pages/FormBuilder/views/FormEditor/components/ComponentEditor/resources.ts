import {
  IconDefinition,
  faPencilAlt,
  faCalculator,
  faListUl,
  faCalendarAlt,
  faStopwatch,
  faEllipsisV,
  faSlidersH,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Icon counterparts for componentTypes
 */
const componentIcons: IconDefinition[] = [
  faComment, // TODO better icon for text description
  faListUl,
  faPencilAlt,
  faCalculator,
  faCalendarAlt,
  faStopwatch,
  faEllipsisV,
  faSlidersH,
];

export const componentTypes = [
  "Text-Description",
  "Dropdown",
  "Text",
  "Number",
  "Date",
  "Time",
  "Multiple Choice",
  "Range",
] as const;

/**
 * Object mapping each component to its corresponding icon
 */
export const componentLabelToIcon = Object.fromEntries(
  componentTypes.map((_, i) => [componentTypes[i], componentIcons[i]])
);
