import { ChangeEvent } from "react";
import { MultipleChoiceOption } from "components/inputs/inputComponents/MultipleChoiceInput";
import { FormInputProps } from "components/inputs/inputComponents";
import { FormAnswer, FormProps, FormSubmission } from "resources/shared";

/**
 * Enrich the component with appropriate onChange functions
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

/**
 * Enrich the component with appropriate state values
 */
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

/**
 * Format submissions to post to backend
 */
export const formatSubmissions = (
  form: FormProps,
  submissions: (string | MultipleChoiceOption[])[]
): FormSubmission =>
  submissions
    // remove submissions with no value, and submissions created for text-description components
    .filter((c, i) => c && form.components[i].type !== "Text-Description")
    // add corresponding titles and types
    .map((value, i) => ({
      title: form.components[i].title,
      type: form.components[i].type,
      value,
    })) as FormSubmission;
