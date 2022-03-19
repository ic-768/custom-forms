import { ChangeEvent } from "react";
import { IInputStyles } from "../../../InputEditor/inputModifiers";

interface IDateInput {
  type?: "Date";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
  placeholder?: string;
  date?: string;
  min?: string;
  max?: string;
  styles?: IInputStyles;
  id?: string;
}

export default IDateInput;
