import { Dispatch, SetStateAction } from "react";

export interface IChoice {
  label: string;
  isSelected?: boolean;
}

interface IMultipleChoiceInput {
  choices: IChoice[];
  onChange: Dispatch<SetStateAction<IChoice[]>>;
  className?: string;
  label?: string;
  modifiers?: object;
}

export default IMultipleChoiceInput;
