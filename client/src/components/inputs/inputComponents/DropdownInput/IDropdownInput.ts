import { CSSProperties } from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

/**
 * Single option of the dropdown list
 */
export interface IDropdownOption<T extends string = string> {
  // value produced if option is selected
  value: string;
  label: T;
  icon?: IconDefinition;
}

/**
 * Dropdown list of selectable options
 */
interface IDropdownInput<T extends string = string> {
  type?: "Dropdown";
  placeholder?: string;
  // options for the list to display
  options: IDropdownOption<T>[];
  // callback for when an option is selected
  onChange?: (v: string) => void;
  selection?: Partial<T>;
  className?: string;
  // icon of the currently selected option
  selectionIcon?: IconDefinition;
  style?: CSSProperties;
  title?: string;
  subtitle?: string;
  id?: string;
}

export default IDropdownInput;
