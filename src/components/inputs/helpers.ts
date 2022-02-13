import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { inputTypes } from "./resources";
import { inputLabelToIcon } from "../AddInputForm/resources";
/**
 * Function that takes the input type and returns its corresponding icon
 */
export const getInputIcon = (
  inputType: string | null
): IconDefinition | undefined =>
  inputType ? inputLabelToIcon[inputType] : undefined;

/**
 * Format the inputs to be displayed in the dropdown menu
 */
export const inputsForDropdown = inputTypes.map((type: string) => ({
  value: type,
  label: type,
  icon: getInputIcon(type),
}));
