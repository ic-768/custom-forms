import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import { componentLabelToIcon } from "./resources";
import { componentTypes } from "./resources";
import { IDropdownOption } from "../../../../components/inputs/inputComponents/DropdownInput";

/**
 * Function that takes the input type and returns its corresponding icon
 */
export const getComponentIcon = (
  componentType: typeof componentTypes[number]
): IconDefinition | undefined =>
  componentType ? componentLabelToIcon[componentType] : undefined;

/**
 * Format the component types to be displayed in the dropdown menu
 */
export const componentsForDropdown = componentTypes.map(
  (type: typeof componentTypes[number]): IDropdownOption => ({
    value: type,
    label: type,
    icon: getComponentIcon(type),
  })
);
