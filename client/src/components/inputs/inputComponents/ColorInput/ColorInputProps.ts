import { CSSProperties } from "react";
import { ColorChangeHandler } from "react-color";

interface ColorInputProps {
  type?: "Color";
  onChange?: ColorChangeHandler;
  value?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  style?: CSSProperties;
  id?: string;
}

export default ColorInputProps;
