import { Dispatch, SetStateAction, CSSProperties } from "react";

export interface IMultipleChoiceOption {
  label: string;
  isSelected?: boolean;
}

interface IMultipleChoiceInput {
  type?: "Multiple Choice";
  choices: IMultipleChoiceOption[];
  onChange: Dispatch<SetStateAction<IMultipleChoiceOption[]>>;
  className?: string;
  title?: string;
  style?: CSSProperties;
  id?: string;
}

export default IMultipleChoiceInput;
