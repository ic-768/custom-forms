import { ChangeEventHandler } from "react";

import { CustomInputStyles } from "resources/shared";

interface TimeInputProps {
  type?: "Time";
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value: string;
  className?: string;
  placeholder?: string;
  title?: string;
  style?: CustomInputStyles;
  id?: string;
}

export default TimeInputProps;
