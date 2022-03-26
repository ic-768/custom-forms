import FontSize from "./FontSize";
import BorderRadius from "./BorderRadius";
import BoxShadowColor from "./BoxShadowColor";
import DropdownOptions from "./DropdownOptions";
import Height from "./Height";

/*
 * Style props shared between input types
 */
interface IInputStyles {
  fontSize?: string;
  borderRadius?: string;
  boxShadow?: string;
  height?: string;
}

export { FontSize, BorderRadius, BoxShadowColor, DropdownOptions, Height };
export type { IInputStyles };
