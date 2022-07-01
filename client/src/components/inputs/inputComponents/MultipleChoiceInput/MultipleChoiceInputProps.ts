import { Dispatch, SetStateAction } from "react";

import { CustomInputStyles } from "resources/shared";

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
  style?: CustomInputStyles;
  id?: string;
}

export default MultipleChoiceInputProps;
