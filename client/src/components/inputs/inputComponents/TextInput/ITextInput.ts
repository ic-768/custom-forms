import { ChangeEvent, CSSProperties } from "react";

interface ITextInput {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type?: "Text";
  label?: string;
  className?: string;
  placeholder?: string;
  maxLength?: number;
  style?: CSSProperties;
  id?: string;
  autoFocus?: boolean;
}

export default ITextInput;
