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
} from "../inputComponents";

type ICustomInput =
  | IDropdownInput
  | ITextInput
  | INumberInput
  | IDateInput
  | ITimeInput
  | IMultipleChoiceInput
  | IRangeInput;

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
    case "Range":
      return <RangeInput {...input} />;
    default:
      return null;
  }
};

export default CustomInput;
export type { ICustomInput };
