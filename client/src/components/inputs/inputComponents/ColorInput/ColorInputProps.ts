import { ColorChangeHandler } from "react-color";

import { CustomInputStyles } from "resources/shared";

interface ColorInputProps {
  type?: "Color";
  onChange?: ColorChangeHandler;
  value?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  style?: CustomInputStyles;
  id?: string;
}

export default ColorInputProps;
