import { IInputStyles } from "../../inputModifiers/types";

interface ITextInput {
  label?: string;
  className?: string;
  placeholder?: string;
  maxLength?: number;
  styles?: IInputStyles;
}

export default ITextInput;
