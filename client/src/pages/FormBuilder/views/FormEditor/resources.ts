import { FormComponentProps } from "components/FormComponent";

/**
 * Component being edited in FormBuilder - index shows its place in form inputs
 */
export type EditedComponent = {
  component: FormComponentProps;
  index: number;
} | null;
