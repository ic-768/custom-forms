import { ChangeEvent } from "react";
import { IInputStyles } from "../../../InputEditor/inputModifiers";

interface ITimeInput {
  type?: "Time";
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  className?: string;
  placeholder?: string;
  label?: string;
  styles?: IInputStyles;
  id?: string;
}

export default ITimeInput;
