import { ChangeEventHandler, CSSProperties } from "react";

interface INumberInput {
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

export default INumberInput;
