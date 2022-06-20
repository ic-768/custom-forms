import { ReactElement } from "react";
import TextDescription, { ITextDescription } from "../TextDescription";

import {
  DateInput,
  DropdownInput,
  MultipleChoiceInput,
  NumberInput,
  TextInput,
  TimeInput,
  RangeInput,
  IFormInput,
} from "../../components/inputs/inputComponents";

type IFormComponent = IFormInput | ITextDescription;

const FormComponent = ({
  component,
}: {
  component: IFormComponent;
}): ReactElement | null => {
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
export type { IFormComponent, IFormInput };
