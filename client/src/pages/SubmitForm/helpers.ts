import { ChangeEvent } from "react";
import { MultipleChoiceOption } from "components/inputs/inputComponents/MultipleChoiceInput";
import { FormInputProps } from "components/inputs/inputComponents";
import { FormAnswer } from "resources/shared";

/**
 * Helper functions used to enrich the component with appropriate onChange
 * hooks and state values
 */
export const addOnChange = (
  component: FormInputProps,
  idx: number,
  setSubmissions: (s: FormAnswer["value"][]) => void,
  submissions: FormAnswer["value"][]
): FormInputProps => {
  switch (component.type) {
    case "Text":
    case "Number":
    case "Range":
    case "Time":
    case "Date":
      return {
        ...component,
        onChange: (e: ChangeEvent<HTMLInputElement>): void => {
          setSubmissions(
            submissions.map((s, i) => (i === idx ? e.target.value : s))
          );
        },
      };
    case "Multiple Choice":
    case "Dropdown":
      return {
        ...component,
        onChange: (v: string | MultipleChoiceOption[]) => {
          setSubmissions(submissions.map((s, i) => (i === idx ? v : s)));
        },
      } as FormInputProps;
    default:
      return component;
  }
};

export const addState = (
  component: FormInputProps,
  idx: number,
  submissions: FormAnswer["value"][]
): FormInputProps => {
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
          (submissions[idx] as MultipleChoiceOption[]) || component.choices,
      };
    case "Dropdown":
      return { ...component, value: submissions[idx] as string };
    default:
      return component;
  }
};
