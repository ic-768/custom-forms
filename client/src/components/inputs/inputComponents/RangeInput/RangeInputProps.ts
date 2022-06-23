import { ChangeEventHandler, CSSProperties } from "react";

interface RangeInputProps {
  type?: "Range";
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value: string;
  className?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  title?: string;
  style?: CSSProperties;
  id?: string;
}

export default RangeInputProps;