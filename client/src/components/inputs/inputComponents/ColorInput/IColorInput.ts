import { CSSProperties } from "react";
import { ColorChangeHandler } from "react-color";

interface IColorInput {
  type?: "Color";
  onChange?: ColorChangeHandler;
  value?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  style?: CSSProperties;
  id?: string;
}

export default IColorInput;
