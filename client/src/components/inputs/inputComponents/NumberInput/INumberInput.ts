import { ChangeEvent, CSSProperties } from "react";

interface INumberInput {
  type?: "Number";
  value?: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  min?: number;
  max?: number;
  label?: string;
  styles?: CSSProperties;
  id?: string;
}

export default INumberInput;
