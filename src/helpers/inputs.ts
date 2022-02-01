import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { inputTypes, inputIcons } from "../resources/inputs";

/**
 * Create an object mapping each input type to its corresponding icon
 */
const labelToIcon = Object.fromEntries(
  inputTypes.map((_, i) => [inputTypes[i], inputIcons[i]])
);

/**
 * Function that takes the input type and returns its corresponsing icon
 */
export const getInputIcon = (
  inputType: string | null
): IconDefinition | undefined =>
  inputType ? labelToIcon[inputType] : undefined;

/**
 * Format the inputs to be displayed in the dropdown menu
 */
export const inputsForDropdown = inputTypes.map((type: string) => ({
  value: type,
  label: type,
  icon: getInputIcon(type),
}));
