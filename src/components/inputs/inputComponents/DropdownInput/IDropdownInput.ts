import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { IInputStyles } from "../../inputModifiers/types";

/**
 * Single option of the dropdown list
 */
export interface IDropdownOption {
  // value produced if option is selected
  value: string;
  label: string;
  icon?: IconDefinition;
}

/**
 * Dropdown list of selectable options
 */
interface IDropdownInput {
  type?: "Dropdown";
  placeholder: string;
  // options for the list to display
  options: IDropdownOption[];
  // callback for when an option is selected
  onChange: (t: string) => void;
  // label of the currently selected option
  selection: string | null;
  className?: string;
  // icon of the currently selected option
  selectionIcon?: IconDefinition;
  styles?: IInputStyles;
  label?: string;
}

export default IDropdownInput;
