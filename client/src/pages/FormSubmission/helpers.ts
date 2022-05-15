import { ChangeEvent, SetStateAction } from "react";
import { IFormComponent } from "../FormBuilder/components/FormComponent";
import { IMultipleChoiceOption } from "../FormBuilder/components/inputs/inputComponents/MultipleChoiceInput";
import { IForm } from "../FormBuilder/resources/shared";

/**
 * Helper functions used to enrich the component with appropriate onChange
 * hooks and state values
 */
export const addOnChange = (
  component: IFormComponent,
  idx: number,
  setSubmissions: Function,
  submissions: IForm["submissions"]
) => {
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
        onChange: (v: string | SetStateAction<IMultipleChoiceOption[]>) => {
          setSubmissions(submissions.map((s, i) => (i === idx ? v : s)));
        },
      };
    default:
      return component;
  }
};

export const addState = (
  component: IFormComponent,
  idx: number,
  submissions: IForm["submissions"]
) => {
  switch (component.type) {
    case "Text":
    case "Number":
    case "Range":
    case "Time":
    case "Date":
      return { ...component, value: submissions[idx] || "" };
    case "Multiple Choice":
      return { ...component, choices: submissions[idx] || component.choices };
    case "Dropdown":
      return { ...component, selection: submissions[idx] };
    default:
      return component;
  }
};
