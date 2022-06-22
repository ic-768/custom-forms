import { ChangeEventHandler, CSSProperties } from "react";

interface TextInputProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  type?: "Text";
  title?: string;
  subtitle?: string;
  className?: string;
  placeholder?: string;
  maxLength?: number;
  style?: CSSProperties;
  id?: string;
  autoFocus?: boolean;
}

export default TextInputProps;
