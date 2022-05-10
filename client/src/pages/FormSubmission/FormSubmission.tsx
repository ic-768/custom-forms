import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { asyncGetForm, asyncSubmitForm } from "../../services/forms";
import FormComponent, {
  IFormComponent,
} from "../FormBuilder/components/FormComponent";
import { IForm } from "../FormBuilder/resources/shared";
import { addOnChange, addState } from "./helpers";

import "./FormSubmission.scss";

const FormSubmission = () => {
  const params = useParams();
  const [form, setForm] = useState<IForm>();

  // TODO submission is created for description component as well - should find a way to prevent that
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

  // Provide input components with onChange and state values
  const enrichComponent = (c: IFormComponent, idx: number) => {
    const withOnChange = addOnChange(c, idx, setSubmissions, submissions);
    const enrichedComponent = addState(withOnChange, idx, submissions);
    return enrichedComponent;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add identifying info to submissions and remove empty entries
    const submissionsWithTitles = submissions.map((s, i) => ({
      title: form.components[i].title,
      type: form.components[i].type,
      value: s,
    }));
    const cleanSubmissions = submissionsWithTitles.filter((s) => s.value);

    asyncSubmitForm(cleanSubmissions);
  };

  return (
    <div className="form-submission-view-background">
      <div className="form-submission-view-container">
        <form
          className="form-submission-view-form-container"
          onSubmit={onSubmit}
        >
          <div className="form-submission-view-form-content">
            <h2 className="form-preview-form-name">{form.name}</h2>
            {form.components.map((c, idx) => (
              <FormComponent
                key={c.id || idx}
                component={enrichComponent(c, idx)}
              />
            ))}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FormSubmission;
