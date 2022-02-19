import React from "react";

import {
  DateInput,
  DropdownInput,
  MultipleChoiceInput,
  NumberInput,
  TextInput,
  TimeInput,
} from "./components/inputs/inputComponents";
import { ICustomInput } from "./components/inputs/resources";
const CustomInput = ({
  input,
}: {
  // contains input type and modifiers
  input: ICustomInput;
}) => {
  console.log(input.type);
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
