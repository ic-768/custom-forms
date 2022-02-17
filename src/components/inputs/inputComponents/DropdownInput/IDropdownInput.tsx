import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { IInputModifiers } from "../../inputModifiers/types";

/**
 * Single option of the dropdown list
 */
interface IDropdownOption {
  // value produced if option is selected
  value: string;
  label: string;
  icon?: IconDefinition;
}

/**
 * Dropdown list of selectable options
 */
interface IDropdownInput {
  placeholder: string;
  // options for the list to display
  options: IDropdownOption[];
  // callback for when an option is selected
  onChange: (v: string) => void;
  // label of the currently selected option
  selection: string | null;
  className?: string;
  // icon of the currently selected option
  selectionIcon?: IconDefinition;
  modifiers?: IInputModifiers;
  label?: string;
}

export default IDropdownInput;
export { type IDropdownOption };
