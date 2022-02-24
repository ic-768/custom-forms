import { Dispatch, SetStateAction } from "react";
import { IInputStyles } from "../../inputModifiers/types";

export interface IChoice {
  label: string;
  isSelected?: boolean;
}

interface IMultipleChoiceInput {
  type?: "Multiple Choice";
  choices: IChoice[];
  onChange: Dispatch<SetStateAction<IChoice[]>>;
  className?: string;
  label?: string;
  styles?: IInputStyles;
}

export default IMultipleChoiceInput;
