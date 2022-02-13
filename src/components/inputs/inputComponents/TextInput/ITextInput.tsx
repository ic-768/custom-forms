import { IInputModifiers } from "../../inputModifiers/types";

interface ITextInput {
  label?: string;
  className?: string;
  placeholder?: string;
  maxLength?: number;
  modifiers?: IInputModifiers;
}

export default ITextInput;
