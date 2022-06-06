import { ChangeEventHandler, CSSProperties } from "react";

interface ITimeInput {
  type?: "Time";
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value: string;
  className?: string;
  placeholder?: string;
  title?: string;
  style?: CSSProperties;
  id?: string;
}

export default ITimeInput;
