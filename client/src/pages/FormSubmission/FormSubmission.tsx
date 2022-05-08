import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { asyncGetForm } from "../../services/forms";
import FormComponent, {
  IFormComponent,
} from "../FormBuilder/components/FormComponent";
import { IForm } from "../FormBuilder/resources/shared";

import "./FormSubmission.scss";

const FormSubmission = () => {
  const params = useParams();
  const [form, setForm] = useState<IForm>();
  const [submissions, setSubmissions] = useState(
    Array(form?.components.length)
  );

  useEffect(() => {
    asyncGetForm(params.user!, params.formId!).then((f) => {
      if (!form) setForm(f);
    });
    setSubmissions(new Array(form?.components.length).fill("")); // fill submission array
  }, [params, form]);

  if (!form) return null;

  // TODO switch statement doesn't seem to narrow the onChange type down correctly,
  // so using any for now...
  const addOnChange = (component: IFormComponent, idx: number) => {
    switch (component.type) {
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

  const addState = (component: IFormComponent, idx: number) => {
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

  return (
    <div className="form-submission-view-background">
      <div className="form-submission-view-container">
        <form className="form-submission-view-form-container">
          <div className="form-submission-view-form-content">
            <h2 className="form-preview-form-name">{form.name}</h2>
            {form.components.map((c, idx) => {
              const component = addState(addOnChange(c, idx), idx);
              return <FormComponent key={c.id || idx} component={component} />;
            })}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormSubmission;
