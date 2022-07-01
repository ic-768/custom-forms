import { ChangeEventHandler } from "react";

import { CustomInputStyles } from "resources/shared";

interface TextInputProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  type?: "Text";
  title?: string;
  subtitle?: string;
  className?: string;
  placeholder?: string;
  maxLength?: number;
  style?: CustomInputStyles;
  id?: string;
  autoFocus?: boolean;
}

export default TextInputProps;
