import { Dispatch, SetStateAction, CSSProperties } from "react";

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
  style?: CSSProperties;
  id?: string;
}

export default IMultipleChoiceInput;
