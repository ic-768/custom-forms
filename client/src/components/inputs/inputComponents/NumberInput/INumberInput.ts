import { ChangeEvent, CSSProperties } from "react";

interface INumberInput {
  type?: "Number";
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
