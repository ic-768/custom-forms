import { ChangeEventHandler } from "react";
import { CustomInputStyles } from "resources/shared";

interface NumberInputProps {
  type?: "Number";
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
  min?: number;
  max?: number;
  title?: string;
  subtitle?: string;
  style?: CustomInputStyles;
  id?: string;
}

export default NumberInputProps;
