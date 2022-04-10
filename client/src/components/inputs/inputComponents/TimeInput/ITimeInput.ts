import { ChangeEvent, CSSProperties } from "react";

interface ITimeInput {
  type?: "Time";
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  className?: string;
  placeholder?: string;
  title?: string;
  style?: CSSProperties;
  id?: string;
}

export default ITimeInput;
