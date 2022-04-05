import { ChangeEvent, CSSProperties } from "react";

interface IRangeInput {
  type?: "Range";
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  className?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  style?: CSSProperties;
  id?: string;
}

export default IRangeInput;
