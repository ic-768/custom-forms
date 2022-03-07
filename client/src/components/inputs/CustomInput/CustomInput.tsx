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
} from "../inputComponents";

type ICustomInput =
  | IDropdownInput
  | ITextInput
  | INumberInput
  | IDateInput
  | ITimeInput
  | IMultipleChoiceInput;

const CustomInput = ({ input }: { input: ICustomInput }) => {
  switch (input.type) {
    case "Date":
      return <DateInput {...input} />;
    case "Dropdown":
      return <DropdownInput {...input} />;
    case "Multiple Choice":
      return <MultipleChoiceInput {...input} />;
    case "Number":
      return <NumberInput {...input} />;
    case "Text":
      return <TextInput {...input} />;
    case "Time":
      return <TimeInput {...input} />;
    default:
      return null;
  }
};

export default CustomInput;
export type { ICustomInput };
