import { CSSProperties } from "react";
import {
  DateInput,
  IDateInput,
  DropdownInput,
  IDropdownInput,
  MultipleChoiceInput,
  IMultipleChoiceInput,
  NumberInput,
  INumberInput,
  TextInput,
  ITextInput,
  TimeInput,
  ITimeInput,
  RangeInput,
  IRangeInput,
} from "../../../../components/inputs/inputComponents";

// TODO put somewhere better
type ITextDescription = {
  type?: "Text-Description";
  title?: string;
  text?: string;
  style?: CSSProperties;
  id?: string;
};

type IFormComponent =
  | IDropdownInput
  | ITextInput
  | INumberInput
  | IDateInput
  | ITimeInput
  | IMultipleChoiceInput
  | IRangeInput
  | ITextDescription;

const FormComponent = ({ component }: { component: IFormComponent }) => {
  switch (component.type) {
    case "Date":
      return <DateInput {...component} />;
    case "Dropdown":
      return <DropdownInput {...component} />;
    case "Multiple Choice":
      return <MultipleChoiceInput {...component} />;
    case "Number":
      return <NumberInput {...component} />;
    case "Text":
      return <TextInput {...component} />;
    case "Time":
      return <TimeInput {...component} />;
    case "Range":
      return <RangeInput {...component} />;
    case "Text-Description":
      return <div>This is where text component will go</div>;
    default:
      return null;
  }
};

export default FormComponent;
export type { IFormComponent };
