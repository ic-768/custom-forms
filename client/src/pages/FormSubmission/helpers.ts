import { IFormComponent } from "../FormBuilder/components/FormComponent";

/**
 * Helper functions used to enrich the component with appropriate onChange
 * hooks and state values
 */

export const addOnChange = (
  component: IFormComponent,
  idx: number,
  setSubmissions: Function,
  submissions: any[]
) => {
  switch (component.type) {
    // TODO switch statement doesn't seem to narrow the onChange type down correctly,
    // so using any in onChange for now...
    case "Text":
    case "Number":
    case "Range":
    case "Time":
    case "Date":
      return {
        ...component,
        onChange: (e: any) => {
          setSubmissions(
            submissions.map((s, i) => (i === idx ? e.target.value : s))
          );
        },
      };
    case "Multiple Choice":
    case "Dropdown":
      return {
        ...component,
        onChange: (v: any) => {
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
  submissions: any[]
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
