import React from "react";

import {
  DateInput,
  DropdownInput,
  MultipleChoiceInput,
  NumberInput,
  TextInput,
  TimeInput,
} from "./components/inputs/inputComponents";
import {
  IDateInput,
  IDropdownInput,
  IMultipleChoiceInput,
  INumberInput,
  ITimeInput,
} from "./components/inputs/inputComponents/types";
import { ICustomInput } from "./components/inputs/resources";
const CustomInput = ({
  input,
}: {
  // contains input type and modifiers
  input: ICustomInput;
}) => {
  switch (input.inputType) {
    case "Date":
      return <DateInput {...(input.props as IDateInput)} />;
    case "Dropdown":
      return (
        <DropdownInput
          {...(input.props as IDropdownInput)}
          styles={input.styles}
        />
      );
    case "Multiple Choice":
      return (
        <MultipleChoiceInput
          {...(input.props as IMultipleChoiceInput)}
          styles={input.styles}
        />
      );
    case "Number":
      return (
        <NumberInput {...(input.props as INumberInput)} styles={input.styles} />
      );
    case "Text":
      return <TextInput styles={input.styles} {...input.props} />;
    case "Time":
      return <TimeInput {...(input.props as ITimeInput)} />;
    default:
      return null;
  }
};

export default CustomInput;
