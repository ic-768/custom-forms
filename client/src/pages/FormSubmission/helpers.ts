import { ChangeEvent } from "react";
import { IMultipleChoiceOption } from "components/inputs/inputComponents/MultipleChoiceInput";
import { IFormInput } from "components/inputs/inputComponents";
import { IFormAnswer } from "resources/shared";

/**
 * Helper functions used to enrich the component with appropriate onChange
 * hooks and state values
 */
export const addOnChange = (
  component: IFormInput,
  idx: number,
  setSubmissions: (s: IFormAnswer["value"][]) => void,
  submissions: IFormAnswer["value"][]
): IFormInput => {
  switch (component.type) {
    case "Text":
    case "Number":
    case "Range":
    case "Time":
    case "Date":
      return {
        ...component,
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          setSubmissions(
            submissions.map((s, i) => (i === idx ? e.target.value : s))
          );
        },
      };
    case "Multiple Choice":
    case "Dropdown":
      return {
        ...component,
        onChange: (v: string | IMultipleChoiceOption[]) => {
          setSubmissions(submissions.map((s, i) => (i === idx ? v : s)));
        },
      } as IFormInput;
    default:
      return component;
  }
};

export const addState = (
  component: IFormInput,
  idx: number,
  submissions: IFormAnswer["value"][]
): IFormInput => {
  switch (component.type) {
    case "Text":
    case "Number":
    case "Range":
    case "Time":
    case "Date":
      return { ...component, value: (submissions[idx] as string) || "" };
    case "Multiple Choice":
      return {
        ...component,
        choices:
          (submissions[idx] as IMultipleChoiceOption[]) || component.choices,
      };
    case "Dropdown":
      return { ...component, value: submissions[idx] as string };
    default:
      return component;
  }
};
