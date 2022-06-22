import { ChangeEventHandler, CSSProperties } from "react";

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
  style?: CSSProperties;
  id?: string;
}

export default NumberInputProps;
