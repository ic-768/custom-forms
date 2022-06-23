import { ChangeEventHandler, CSSProperties } from "react";

interface DateInputProps {
  type?: "Date";
  onChange?: ChangeEventHandler<HTMLInputElement>;
  title?: string;
  subtitle?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  min?: string;
  max?: string;
  style?: CSSProperties;
  id?: string;
}

export default DateInputProps;