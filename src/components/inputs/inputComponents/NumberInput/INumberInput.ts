import { ChangeEvent } from "react";
import { IInputStyles } from "../../inputModifiers/types";

interface INumberInput {
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  min?: number;
  max?: number;
  width?: number;
  label?: string;
  styles?: IInputStyles;
}

export default INumberInput;
