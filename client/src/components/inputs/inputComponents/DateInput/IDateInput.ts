import { ChangeEvent, CSSProperties } from "react";

interface IDateInput {
  type?: "Date";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  title?: string;
  subtitle?: string;
  className?: string;
  placeholder?: string;
  date?: string;
  min?: string;
  max?: string;
  style?: CSSProperties;
  id?: string;
}

export default IDateInput;
