import { ChangeEvent, CSSProperties } from "react";

interface IDateInput {
  type?: "Date";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
  placeholder?: string;
  date?: string;
  min?: string;
  max?: string;
  style?: CSSProperties;
  id?: string;
}

export default IDateInput;
