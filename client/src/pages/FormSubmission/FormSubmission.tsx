import { FormEventHandler, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { addOnChange, addState } from "./helpers";
import { asyncGetForm, asyncSubmitForm } from "services/forms";
import FormPage from "components/FormPage";
import { IForm } from "resources/shared";
import FormComponent, { IFormComponent } from "components/FormComponent";

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

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    // Add identifying info to submissions and remove empty entries
    const submissionsWithTitles = submissions.map((s, i) => ({
      title: form.components[i].title,
      type: form.components[i].type,
      value: s,
    }));
    const cleanSubmissions = submissionsWithTitles.filter((s) => s.value);

    asyncSubmitForm(params.user!, params.formId!, cleanSubmissions);
  };

  return (
    <div className="form-submission-view-background">
      <FormPage
        styles={form.styles}
        className="form-submission-form"
        content={
          <>
            <h2 className="form-submission-form-name">{form.name}</h2>
            {form.components.map((c, idx) => (
              <FormComponent
                key={c.id || idx}
                component={enrichComponent(c, idx)}
              />
            ))}
          </>
        }
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default FormSubmission;
