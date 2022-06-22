import { Dispatch, SetStateAction, CSSProperties } from "react";

export interface MultipleChoiceOption {
  label: string;
  isSelected?: boolean;
}

interface MultipleChoiceInputProps {
  type?: "Multiple Choice";
  choices: MultipleChoiceOption[];
  onChange?: Dispatch<SetStateAction<MultipleChoiceOption[]>>;
  className?: string;
  title?: string;
  style?: CSSProperties;
  id?: string;
}

export default MultipleChoiceInputProps;
