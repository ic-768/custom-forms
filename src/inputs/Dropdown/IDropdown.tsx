import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

/**
 * Single option of the dropdown list
 */
interface IOption {
  value: string; // value produced if option is selected
  label: string;
  icon?: IconDefinition;
}

/**
 * Dropdown list of selectable options
 */
interface IDropdown {
  id: string;
  placeholder: string;
  options: IOption[]; // options for the list to display
  onChange: (v: string) => void; // callback for when an option is selected
  selection: string | null; // label of the currently selected option
  className?: string;
  selectionIcon?: IconDefinition; // icon of the currently selected option
}

export default IDropdown;
