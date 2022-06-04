import TextDescription, { ITextDescription } from "../TextDescription";

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
} from "../../components/inputs/inputComponents";

type IFormComponent =
  | IDropdownInput<string, string>
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
      return <TextDescription {...component} />;
    default:
      return null;
  }
};

export default FormComponent;
export type { IFormComponent };
