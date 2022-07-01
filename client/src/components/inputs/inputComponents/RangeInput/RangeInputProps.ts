import { ChangeEventHandler } from "react";

import { CustomInputStyles } from "resources/shared";

interface RangeInputProps {
  type?: "Range";
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value: string;
  className?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  title?: string;
  style?: CustomInputStyles;
  id?: string;
}

export default RangeInputProps;
