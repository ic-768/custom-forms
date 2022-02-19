import { IInputStyles } from "../../inputModifiers/types";

interface ITextInput {
  type?: "Text";
  label?: string;
  className?: string;
  placeholder?: string;
  maxLength?: number;
  styles?: IInputStyles;
}

export default ITextInput;
