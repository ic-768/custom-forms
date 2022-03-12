import { ChangeEvent } from "react";
import { IInputStyles } from "../../inputModifiers/types";

interface ITextInput {
  onChange?: (v: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type?: "Text";
  label?: string;
  className?: string;
  placeholder?: string;
  maxLength?: number;
  styles?: IInputStyles;
}

export default ITextInput;
