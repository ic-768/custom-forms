import { ChangeEvent } from "react";

interface INumberInput {
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  min?: number;
  max?: number;
  width?: number;
  label?: string;
  modifiers?: object;
}

export default INumberInput;
