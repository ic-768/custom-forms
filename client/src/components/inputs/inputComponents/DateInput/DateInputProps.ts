import { ChangeEventHandler } from "react";

import { CustomInputStyles } from "resources/shared";

interface DateInputProps {
  type?: "Date";
  onChange?: ChangeEventHandler<HTMLInputElement>;
  title?: string;
  subtitle?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  min?: string;
  max?: string;
  style?: CustomInputStyles;
  id?: string;
}

export default DateInputProps;
