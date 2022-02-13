import {
  faPencilAlt,
  faCalculator,
  faListUl,
  faCalendarAlt,
  faStopwatch,
  IconDefinition,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { inputTypes } from "../inputs/resources";

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

/**
 * Object mapping each input to its corresponding icon
 */
export const inputLabelToIcon: { [key: string]: IconDefinition } =
  Object.fromEntries(inputTypes.map((_, i) => [inputTypes[i], inputIcons[i]]));
