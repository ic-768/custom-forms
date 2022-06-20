import { FormEventHandler, ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { addOnChange, addState } from "./helpers";
import { asyncGetForm, asyncSubmitForm } from "services/forms";
import { IFormInput } from "components/inputs/inputComponents";
import FormPage from "components/FormPage";
import FormComponent from "components/FormComponent";
import { IForm, IFormAnswer, IFormSubmission, isForm } from "resources/shared";

import "./FormSubmission.scss";

const FormSubmission = (): ReactElement | null => {
  const params = useParams();
  const [form, setForm] = useState<IForm>();

  // Array of answers - one for each form component
  const [submissions, setSubmissions] = useState<IFormAnswer["value"][]>(
    Array(form?.components.length)
  );

  useEffect(() => {
    asyncGetForm(params.user!, params.formId).then((f) => {
      if (!form && isForm(f)) setForm(f);
    });

    setSubmissions(new Array(form?.components.length).fill("")); // fill submission array
  }, [params, form]);

  if (!form) return null;

  // Provide input components with onChange and state values
  const enrichComponent = (c: IFormInput, idx: number): IFormInput => {
    const withOnChange = addOnChange(c, idx, setSubmissions, submissions);
    const enrichedComponent = addState(withOnChange, idx, submissions);
    return enrichedComponent;
  };

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const formattedSubmissions = submissions
      // remove submissions with no value, and submissions created for text-description components
      .filter((c, i) => c && form.components[i].type !== "Text-Description")
      // add corresponding titles and types
      .map((s, i) => ({
        title: form.components[i].title,
        type: form.components[i].type,
        value: s,
      }));

    asyncSubmitForm(
      params.user!,
      params.formId,
      formattedSubmissions as IFormSubmission
    );
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
                component={
                  c.type === "Text-Description"
                    ? c
                    : enrichComponent(c as IFormInput, idx)
                }
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
