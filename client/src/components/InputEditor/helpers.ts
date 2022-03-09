import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import { inputLabelToIcon } from "./resources";
import { inputTypes } from "./resources";
import { IDropdownOption } from "../inputs/inputComponents/DropdownInput/IDropdownInput";

/**
 * Function that takes the input type and returns its corresponding icon
 */
export const getInputIcon = (
  inputType: typeof inputTypes[number]
): IconDefinition | undefined =>
  inputType ? inputLabelToIcon[inputType] : undefined;

/**
 * Format the inputs to be displayed in the dropdown menu
 */
export const inputsForDropdown = inputTypes.map(
  (type: string): IDropdownOption => ({
    value: type,
    label: type,
    icon: getInputIcon(type),
  })
);
